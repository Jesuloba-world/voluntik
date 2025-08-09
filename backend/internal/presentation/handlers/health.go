package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/danielgtaylor/huma/v2"
	"github.com/redis/go-redis/v9"

	"github.com/voluntik/backend/internal/application/services"
	"github.com/voluntik/backend/internal/infrastructure/auth"
	"github.com/voluntik/backend/internal/infrastructure/session"
	"github.com/voluntik/backend/internal/config"
)

type UserHandler struct {
	userService  *services.UserService
	sessionStore *session.Store
}

func NewUserHandler(userService *services.UserService, store *session.Store) *UserHandler {
	return &UserHandler{userService: userService, sessionStore: store}
}

type LoginInput struct {
	Body struct {
		Email    string `json:"email" example:"user@example.com" doc:"User email address" minLength:"1"`
		Password string `json:"password" example:"P@ssw0rd!" doc:"User password" minLength:"1"`
	}
}

type LoginOutput struct {
	Token     string      `json:"token" example:"eyJ..." doc:"JWT access token"`
	SetCookie http.Cookie `header:"Set-Cookie" doc:"Session cookie (vt_session)"`
}

func (h *UserHandler) Login(ctx context.Context, input *LoginInput) (*LoginOutput, error) {
	user, err := h.userService.Login(ctx, input.Body.Email, input.Body.Password)
	if err != nil {
		return nil, huma.Error401Unauthorized("Invalid credentials")
	}
	token, err := auth.GenerateToken(user.ID, user.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to generate token")
	}
	// create session and set cookie
	sess, err := h.sessionStore.Create(ctx, user.ID, user.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to create session")
	}
	secure := config.Get().Server.Environment == "production"
	cookie := http.Cookie{Name: session.CookieName, Value: sess.ID, Path: "/", HttpOnly: true, Secure: secure, SameSite: http.SameSiteLaxMode, Expires: sess.Expiry, MaxAge: int(time.Until(sess.Expiry).Seconds())}
	return &LoginOutput{Token: token, SetCookie: cookie}, nil
}

type RegisterInput struct {
	Body struct {
		Email    string `json:"email" example:"newuser@example.com" doc:"User email address" minLength:"1"`
		Password string `json:"password" example:"S3cur3P@ss" doc:"User password" minLength:"1"`
	}
}

type RegisterOutput struct {
	Message   string      `json:"message" example:"User registered successfully" doc:"Registration status message"`
	SetCookie http.Cookie `header:"Set-Cookie" doc:"Session cookie (vt_session)"`
}

func (h *UserHandler) Register(ctx context.Context, input *RegisterInput) (*RegisterOutput, error) {
	user, err := h.userService.Register(ctx, input.Body.Email, input.Body.Password)
	if err != nil {
		return nil, huma.Error400BadRequest("Registration failed")
	}
	// auto-login by creating session
	sess, err := h.sessionStore.Create(ctx, user.ID, user.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to create session")
	}
	secure := config.Get().Server.Environment == "production"
	cookie := http.Cookie{Name: session.CookieName, Value: sess.ID, Path: "/", HttpOnly: true, Secure: secure, SameSite: http.SameSiteLaxMode, Expires: sess.Expiry, MaxAge: int(time.Until(sess.Expiry).Seconds())}
	return &RegisterOutput{Message: "User registered successfully", SetCookie: cookie}, nil
}

type GoogleLoginOutput struct {
	Status    int         `json:"-"`
	Location  string      `header:"Location" example:"https://accounts.google.com/o/oauth2/v2/auth?..." doc:"Redirect to Google OAuth URL"`
	SetCookie http.Cookie `header:"Set-Cookie" doc:"Short-lived OAuth state cookie"`
}

func (h *UserHandler) GoogleLogin(ctx context.Context, input *struct{}) (*GoogleLoginOutput, error) {
	state, err := auth.GenerateOAuthState()
	if err != nil {
		return nil, huma.Error500InternalServerError("Internal error")
	}
	cfg := auth.GetGoogleOAuthConfig()
	url := cfg.AuthCodeURL(state)
	secure := config.Get().Server.Environment == "production"
	cookie := http.Cookie{Name: "oauth_state", Value: state, Path: "/", MaxAge: 300, HttpOnly: true, Secure: secure, SameSite: http.SameSiteLaxMode}
	return &GoogleLoginOutput{
		Status:    http.StatusTemporaryRedirect,
		Location:  url,
		SetCookie: cookie,
	}, nil
}

type GoogleCallbackInput struct {
	State       string `query:"state" example:"state-abc123" doc:"OAuth state returned by Google"`
	Code        string `query:"code" example:"auth-code-xyz" doc:"Authorization code from Google"`
	StateCookie string `cookie:"oauth_state" example:"state-abc123" doc:"Previously set OAuth state cookie"`
}

type GoogleCallbackOutput struct {
	Status    int         `json:"-"`
	Location  string      `header:"Location" example:"https://app.example.com/?token=eyJ..." doc:"Redirect back to app with JWT token"`
	SetCookie http.Cookie `header:"Set-Cookie" doc:"Session cookie (vt_session)"`
}

func (h *UserHandler) GoogleCallback(ctx context.Context, input *GoogleCallbackInput) (*GoogleCallbackOutput, error) {
	if input.StateCookie != input.State {
		return nil, huma.Error400BadRequest("Invalid state")
	}
	cfg := auth.GetGoogleOAuthConfig()
	token, err := cfg.Exchange(ctx, input.Code)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to exchange token")
	}
	client := cfg.Client(ctx, token)
	userInfo, err := auth.GetGoogleUserInfo(client)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to get user info")
	}
	user, err := h.userService.FindOrCreateGoogleUser(ctx, userInfo.Email, userInfo.ID)
	if err != nil {
		return nil, huma.Error500InternalServerError("Database error")
	}
	jwtToken, err := auth.GenerateToken(user.ID, user.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to generate JWT")
	}
	// create session cookie
	sess, err := h.sessionStore.Create(ctx, user.ID, user.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to create session")
	}
	secure := config.Get().Server.Environment == "production"
	setSessCookie := http.Cookie{Name: session.CookieName, Value: sess.ID, Path: "/", HttpOnly: true, Secure: secure, SameSite: http.SameSiteLaxMode, Expires: sess.Expiry, MaxAge: int(time.Until(sess.Expiry).Seconds())}

	redirectURL := config.Get().Server.PostLoginRedirect
	if redirectURL == "" {
		redirectURL = "/"
	}
	return &GoogleCallbackOutput{
		Status:    http.StatusFound,
		Location:  redirectURL + "?token=" + jwtToken,
		SetCookie: setSessCookie,
	}, nil
}

// Logout handler clears session
type LogoutInput struct {
	SessID string `cookie:"vt_session" example:"sess_abc123" doc:"Session cookie value to clear"`
}

type LogoutOutput struct {
	Message   string      `json:"message" example:"Logged out" doc:"Logout status message"`
	SetCookie http.Cookie `header:"Set-Cookie" doc:"Clears session cookie"`
}

func (h *UserHandler) Logout(ctx context.Context, input *LogoutInput) (*LogoutOutput, error) {
	if input.SessID != "" {
		_ = h.sessionStore.Delete(ctx, input.SessID)
	}
	secure := config.Get().Server.Environment == "production"
	clear := http.Cookie{Name: session.CookieName, Value: "", Path: "/", HttpOnly: true, Secure: secure, SameSite: http.SameSiteLaxMode, Expires: time.Now().Add(-time.Hour), MaxAge: -1}
	return &LogoutOutput{Message: "Logged out", SetCookie: clear}, nil
}

// Session info
type SessionMeOutput struct {
	UserID string `json:"user_id" example:"user_123" doc:"Authenticated user ID from session"`
	Role   string `json:"role" example:"volunteer" doc:"User role from session"`
}

func (h *UserHandler) Me(ctx context.Context, input *struct{}) (*SessionMeOutput, error) {
	val := ctx.Value("session")
	if val == nil {
		return nil, huma.Error401Unauthorized("No session")
	}
	sess, ok := val.(*session.Session)
	if !ok {
		return nil, huma.Error500InternalServerError("Session type error")
	}
	return &SessionMeOutput{UserID: sess.UserID, Role: sess.Role}, nil
}

// Refresh token using session
type RefreshOutput struct {
	Token string `json:"token" example:"eyJ..." doc:"Newly issued JWT access token"`
}

func (h *UserHandler) Refresh(ctx context.Context, input *struct{}) (*RefreshOutput, error) {
	val := ctx.Value("session")
	if val == nil {
		return nil, huma.Error401Unauthorized("No session")
	}
	sess, ok := val.(*session.Session)
	if !ok {
		return nil, huma.Error500InternalServerError("Session type error")
	}
	// Issue new JWT for the session user
	token, err := auth.GenerateToken(sess.UserID, sess.Role)
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to generate token")
	}
	return &RefreshOutput{Token: token}, nil
}

// HealthHandler provides a simple health check endpoint

type HealthHandler struct {
	rdb *redis.Client
	env string
}

func NewHealthHandler(rdb *redis.Client, env string) *HealthHandler {
	return &HealthHandler{rdb: rdb, env: env}
}

type HealthOutput struct {
	Status string `json:"status" example:"ok"`
	Env    string `json:"env" example:"development"`
	Redis  string `json:"redis" example:"ok"`
}

func (h *HealthHandler) Health(ctx context.Context, input *struct{}) (*HealthOutput, error) {
	redisStatus := "disabled"
	if h.rdb != nil {
		if err := h.rdb.Ping(ctx).Err(); err != nil {
			redisStatus = "error"
		} else {
			redisStatus = "ok"
		}
	}
	return &HealthOutput{Status: "ok", Env: h.env, Redis: redisStatus}, nil
}

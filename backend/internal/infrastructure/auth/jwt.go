package auth

import (
	"errors"
	"net/http"
	"time"

	"github.com/danielgtaylor/huma/v2"
	"github.com/golang-jwt/jwt/v5"

	"github.com/voluntik/backend/internal/config"
)

func jwtSecret() []byte { return []byte(config.Get().JWT.Secret) }

// Role constants used across the application
const (
	RoleVolunteer   = "volunteer"
	RoleCoordinator = "coordinator"
	RoleAdmin       = "admin"
)

// IsValidRole validates that the given role is one of the known roles
func IsValidRole(role string) bool {
	switch role {
	case RoleVolunteer, RoleCoordinator, RoleAdmin:
		return true
	default:
		return false
	}
}

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// GenerateToken creates a new JWT token
func GenerateToken(userID, role string) (string, error) {
	claims := Claims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret())
}

// JWTAuthMiddleware for Huma v2
func JWTAuthMiddleware(api huma.API) func(ctx huma.Context, next func(huma.Context)) {
	return func(ctx huma.Context, next func(huma.Context)) {
		tokenStr := ctx.Header("Authorization")
		if tokenStr == "" {
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Missing authorization token")
			return
		}
		if len(tokenStr) > 7 && tokenStr[:7] == "Bearer " {
			tokenStr = tokenStr[7:]
		}
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return jwtSecret(), nil
		})
		if err != nil || !token.Valid {
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Invalid token")
			return
		}
		next(huma.WithValue(ctx, "claims", claims))
	}
}

// RequireRole ensures the authenticated user (from JWT claims) has one of the allowed roles
func RequireRole(api huma.API, allowed ...string) func(ctx huma.Context, next func(huma.Context)) {
	allowedSet := map[string]struct{}{}
	for _, r := range allowed {
		allowedSet[r] = struct{}{}
	}
	return func(ctx huma.Context, next func(huma.Context)) {
		val := ctx.Context().Value("claims")
		c, ok := val.(*Claims)
		if !ok || c == nil {
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Missing or invalid claims")
			return
		}
		if _, ok := allowedSet[c.Role]; !ok {
			huma.WriteErr(api, ctx, http.StatusForbidden, "Insufficient role")
			return
		}
		next(ctx)
	}
}
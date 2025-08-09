package presentation

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/redis/go-redis/v9"

	"github.com/voluntik/backend/internal/application/services"
	"github.com/voluntik/backend/internal/infrastructure/auth"
	"github.com/voluntik/backend/internal/infrastructure/session"
	"github.com/voluntik/backend/internal/presentation/handlers"
)

func SetupRoutes(api huma.API, userService *services.UserService, rdb *redis.Client, env string) {
	healthHandler := handlers.NewHealthHandler(rdb, env)
	huma.Register(api, huma.Operation{
		OperationID: "health-check",
		Path:        "/health",
		Method:      http.MethodGet,
		Summary:     "Health check",
		Description: "Returns service health and an example feature flag status.",
	}, healthHandler.Health)

	store := session.NewStore(rdb)
	userHandler := handlers.NewUserHandler(userService, store)

	grpAuth := huma.NewGroup(api, "/auth")
	grpAuth.UseSimpleModifier(huma.OperationTags("Auth"))
	huma.Register(grpAuth, huma.Operation{OperationID: "auth-login", Path: "/login", Method: http.MethodPost, Summary: "Login", Description: "Authenticate with email & password. Returns a JWT and sets a session cookie."}, userHandler.Login)
	huma.Register(grpAuth, huma.Operation{OperationID: "auth-register", Path: "/register", Method: http.MethodPost, Summary: "Register", Description: "Create a new user account. Also creates a session and sets the session cookie."}, userHandler.Register)
	huma.Register(grpAuth, huma.Operation{OperationID: "auth-google-start", Path: "/google", Method: http.MethodGet, Summary: "Google OAuth Start", Description: "Starts Google OAuth flow by redirecting to Google's consent screen."}, userHandler.GoogleLogin)
	huma.Register(grpAuth, huma.Operation{OperationID: "auth-google-callback", Path: "/google/callback", Method: http.MethodGet, Summary: "Google OAuth Callback", Description: "Handles the OAuth callback, issues a JWT, and sets the session cookie."}, userHandler.GoogleCallback)
	huma.Register(grpAuth, huma.Operation{OperationID: "auth-logout", Path: "/logout", Method: http.MethodPost, Summary: "Logout", Description: "Clears the session cookie and invalidates the server-side session."}, userHandler.Logout)

	grpSession := huma.NewGroup(api, "/session")
	grpSession.UseSimpleModifier(huma.OperationTags("Session"))
	grpSession.UseMiddleware(session.Middleware(api, store))
	huma.Register(grpSession, huma.Operation{OperationID: "session-me", Path: "/me", Method: http.MethodGet, Summary: "Get current session", Description: "Returns the user ID and role from the active session."}, userHandler.Me)
	huma.Register(grpSession, huma.Operation{OperationID: "session-refresh", Path: "/refresh", Method: http.MethodPost, Summary: "Refresh JWT using active session", Description: "Issues a new JWT for the user associated with the active session."}, userHandler.Refresh)

	protectedHandler := handlers.NewProtectedHandler()
	grpProtected := huma.NewGroup(api, "/protected")
	grpProtected.UseSimpleModifier(huma.OperationTags("Protected"))
	grpProtected.UseMiddleware(auth.JWTAuthMiddleware(api))
	huma.Register(grpProtected, huma.Operation{OperationID: "protected-test", Path: "/test", Method: http.MethodGet, Summary: "Protected test endpoint", Description: "Example endpoint that requires a valid bearer JWT.", Security: []map[string][]string{{"bearer": {}}}}, protectedHandler.Test)

	rbacHandler := handlers.NewRBACHandler(userService, api)
	grpRBAC := huma.NewGroup(api, "/admin")
	grpRBAC.UseSimpleModifier(huma.OperationTags("Admin"))
	grpRBAC.UseMiddleware(auth.JWTAuthMiddleware(api))
	grpRBAC.UseMiddleware(auth.RequireRole(api, auth.RoleAdmin))
	huma.Register(grpRBAC, huma.Operation{OperationID: "admin-list-roles", Path: "/roles", Method: http.MethodGet, Summary: "List roles", Description: "List all available roles.", Security: []map[string][]string{{"bearer": {}}}}, rbacHandler.ListRoles)
	huma.Register(grpRBAC, huma.Operation{OperationID: "admin-change-role", Path: "/users/{userId}/role", Method: http.MethodPut, Summary: "Change user role", Description: "Change a user's role. Admins only.", Security: []map[string][]string{{"bearer": {}}}}, rbacHandler.RoleManagement)

	grpCoord := huma.NewGroup(api, "/coordinator")
	grpCoord.UseSimpleModifier(huma.OperationTags("Coordinator"))
	grpCoord.UseMiddleware(auth.JWTAuthMiddleware(api))
	grpCoord.UseMiddleware(auth.RequireRole(api, auth.RoleCoordinator, auth.RoleAdmin))
	huma.Register(grpCoord, huma.Operation{OperationID: "coordinator-area", Path: "/area", Method: http.MethodGet, Summary: "Coordinator area", Description: "Example endpoint restricted to coordinators and admins.", Security: []map[string][]string{{"bearer": {}}}}, rbacHandler.CoordinatorArea)

	grpAdmin := huma.NewGroup(api, "/admin-only")
	grpAdmin.UseSimpleModifier(huma.OperationTags("AdminOnly"))
	grpAdmin.UseMiddleware(auth.JWTAuthMiddleware(api))
	grpAdmin.UseMiddleware(auth.RequireRole(api, auth.RoleAdmin))
	huma.Register(grpAdmin, huma.Operation{OperationID: "admin-only-area", Path: "/area", Method: http.MethodGet, Summary: "Admin area", Description: "Example endpoint restricted to admins only.", Security: []map[string][]string{{"bearer": {}}}}, rbacHandler.AdminOnly)
}
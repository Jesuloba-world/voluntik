package session

import (
	"net/http"

	"github.com/danielgtaylor/huma/v2"
)

type contextKey string

const (
	ContextSessionKey contextKey = "session"
	CookieName        string     = "vt_session"
)

// Middleware validates session cookie and loads session
func Middleware(api huma.API, store *Store) func(ctx huma.Context, next func(huma.Context)) {
	return func(ctx huma.Context, next func(huma.Context)) {
		c, err := huma.ReadCookie(ctx, CookieName)
		if err != nil || c == nil || c.Value == "" {
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Missing session")
			return
		}

		sess, err := store.Get(ctx.Context(), c.Value)
		if err != nil {
			huma.WriteErr(api, ctx, http.StatusUnauthorized, "Invalid session")
			return
		}

		// Refresh sliding expiration (ignore error)
		_ = store.Update(ctx.Context(), sess.ID)

		next(huma.WithValue(ctx, string(ContextSessionKey), sess))
	}
}

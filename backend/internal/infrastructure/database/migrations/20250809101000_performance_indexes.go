package migrations

import (
	"context"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		if _, err := db.ExecContext(ctx, "CREATE INDEX IF NOT EXISTS users_role_idx ON users (role)"); err != nil {
			return err
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		if _, err := db.ExecContext(ctx, "DROP INDEX IF EXISTS users_role_idx"); err != nil {
			return err
		}
		return nil
	})
}
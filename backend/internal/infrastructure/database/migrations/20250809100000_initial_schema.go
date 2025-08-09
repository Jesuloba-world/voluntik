package migrations

import (
	"context"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		// Create users table based on the User entity
		_, err := db.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS users (
				id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				organization_id UUID,
				email VARCHAR(255) UNIQUE NOT NULL,
				password_hash VARCHAR(255),
				role VARCHAR(50) NOT NULL,
				created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				google_id VARCHAR(255)
			)`)
		if err != nil {
			return err
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		// Drop users table
		if _, err := db.ExecContext(ctx, "DROP TABLE IF EXISTS users CASCADE"); err != nil {
			return err
		}
		return nil
	})
}
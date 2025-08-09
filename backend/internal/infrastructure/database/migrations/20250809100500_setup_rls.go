package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		// Only apply RLS to existing tables (currently users)
		tables := []string{"users"}

		for _, table := range tables {
			if _, err := db.ExecContext(ctx, fmt.Sprintf("ALTER TABLE %s ENABLE ROW LEVEL SECURITY;", table)); err != nil {
				return err
			}

			if _, err := db.ExecContext(ctx, fmt.Sprintf(`
				CREATE POLICY %s_select_policy ON %s
				FOR SELECT USING (true);
			`, table, table)); err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		// Drop policies and disable RLS for existing tables only
		tables := []string{"users"}

		for _, table := range tables {
			_, _ = db.ExecContext(ctx, fmt.Sprintf("DROP POLICY IF EXISTS %s_select_policy ON %s;", table, table))
			_, _ = db.ExecContext(ctx, fmt.Sprintf("ALTER TABLE %s DISABLE ROW LEVEL SECURITY;", table))
		}
		return nil
	})
}
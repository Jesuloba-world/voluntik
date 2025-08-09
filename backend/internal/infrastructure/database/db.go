package database

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"

	"github.com/voluntik/backend/internal/config"
)

var DB *bun.DB

func InitDB() {
	dsn := config.Get().Database.DSN
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	DB = bun.NewDB(sqldb, pgdialect.New())

	DB.SetMaxOpenConns(50)
	DB.SetMaxIdleConns(25)
	DB.SetConnMaxLifetime(5 * time.Minute)
	DB.SetConnMaxIdleTime(1 * time.Minute)
}

func HealthCheck(ctx context.Context) error {
	return DB.PingContext(ctx)
}

func Close() error {
	return DB.Close()
}

func WithRetry(ctx context.Context, attempts int, delay time.Duration, fn func() error) error {
	var err error
	for i := 0; i < attempts; i++ {
		err = fn()
		if err == nil {
			return nil
		}
		time.Sleep(delay)
	}
	return err
}

func WithTenant(ctx context.Context, orgID string, fn func(tx bun.Tx) error) error {
	if orgID == "" {
		return errors.New("organization ID is required")
	}
	return DB.RunInTx(ctx, &sql.TxOptions{}, func(ctx context.Context, tx bun.Tx) error {
		_, err := tx.ExecContext(ctx, "SET LOCAL app.current_organization_id = ?", orgID)
		if err != nil {
			return err
		}
		return fn(tx)
	})
}

package database
import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"time"
)

// BackupDatabase performs a logical backup using pg_dump
type BackupOptions struct {
	DBName     string
	Username   string
	Host       string
	Port       string
	OutputFile string
}

func BackupDatabase(ctx context.Context, opts BackupOptions) error {
	if opts.OutputFile == "" {
		opts.OutputFile = fmt.Sprintf("backup_%s.sql", time.Now().Format("20060102_150405"))
	}
	cmd := exec.CommandContext(ctx, "pg_dump",
		"-U", opts.Username,
		"-h", opts.Host,
		"-p", opts.Port,
		"-f", opts.OutputFile,
		opts.DBName,
	)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

// Note: For full production backup strategy, configure PostgreSQL with WAL archiving for PITR.
// Set archive_mode = on and archive_command in postgresql.conf.
// Use tools like pgBackRest for automated backups, verification, and restoration.
package entities
import (
	"time"

	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID             string    `bun:",pk" json:"id"`
	OrganizationID string    `bun:"organization_id" json:"organization_id"`
	Email          string    `bun:"email,unique" json:"email"`
	PasswordHash   string    `bun:"password_hash" json:"-"`
	Role           string    `bun:"role" json:"role"` // volunteer, coordinator, admin
	CreatedAt      time.Time `bun:"created_at,nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt      time.Time `bun:"updated_at,nullzero,notnull,default:current_timestamp" json:"updated_at"`
	GoogleID       string    `bun:"google_id" json:"-"`
}
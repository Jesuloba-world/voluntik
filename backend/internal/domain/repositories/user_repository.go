package repositories

import (
	"context"

	"github.com/voluntik/backend/internal/domain/entities"
)

type UserRepository interface {
	FindByEmail(ctx context.Context, email string) (*entities.User, error)
	FindByID(ctx context.Context, id string) (*entities.User, error)
	Create(ctx context.Context, user *entities.User) error
	Update(ctx context.Context, user *entities.User) error
}

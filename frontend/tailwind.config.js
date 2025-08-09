package repositories

import (
	"context"

	"github.com/uptrace/bun"
	"github.com/voluntik/backend/internal/domain/entities"
	"github.com/voluntik/backend/internal/domain/repositories"
)

type userRepository struct {
	db *bun.DB
}

func NewUserRepository(db *bun.DB) repositories.UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindByEmail(ctx context.Context, email string) (*entities.User, error) {
	user := new(entities.User)
	err := r.db.NewSelect().Model(user).Where("email = ?", email).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *userRepository) FindByID(ctx context.Context, id string) (*entities.User, error) {
	user := new(entities.User)
	err := r.db.NewSelect().Model(user).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *userRepository) Create(ctx context.Context, user *entities.User) error {
	_, err := r.db.NewInsert().Model(user).Exec(ctx)
	return err
}

func (r *userRepository) Update(ctx context.Context, user *entities.User) error {
	_, err := r.db.NewUpdate().Model(user).WherePK().Exec(ctx)
	return err
}

package services

import (
	"context"
	"errors"

	"golang.org/x/crypto/bcrypt"

	"github.com/voluntik/backend/internal/domain/entities"
	"github.com/voluntik/backend/internal/domain/repositories"
	"github.com/voluntik/backend/internal/infrastructure/auth"
)

type UserService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Login(ctx context.Context, email, password string) (*entities.User, error) {
	user, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if user.PasswordHash == "" {
		return nil, errors.New("password not set")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return nil, errors.New("invalid credentials")
	}
	return user, nil
}

func (s *UserService) Register(ctx context.Context, email, password string) (*entities.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	user := &entities.User{
		Email:        email,
		PasswordHash: string(hash),
		Role:         auth.RoleVolunteer,
	}
	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) FindOrCreateGoogleUser(ctx context.Context, email, googleID string) (*entities.User, error) {
	user, err := s.repo.FindByEmail(ctx, email)
	if err == nil {
		// Update GoogleID if missing
		if user.GoogleID == "" {
			user.GoogleID = googleID
			if err := s.repo.Update(ctx, user); err != nil {
				return nil, err
			}
		}
		return user, nil
	}
	// Create new user with GoogleID
	user = &entities.User{
		Email:    email,
		GoogleID: googleID,
		Role:     auth.RoleVolunteer,
	}
	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}

// ChangeUserRole updates a user's role if valid
func (s *UserService) ChangeUserRole(ctx context.Context, userID string, newRole string) error {
	if !auth.IsValidRole(newRole) {
		return errors.New("invalid role")
	}
	u, err := s.repo.FindByID(ctx, userID)
	if err != nil {
		return err
	}
	u.Role = newRole
	return s.repo.Update(ctx, u)
}
package handlers

import (
	"context"

	"github.com/danielgtaylor/huma/v2"
	"github.com/voluntik/backend/internal/application/services"
	"github.com/voluntik/backend/internal/infrastructure/auth"
)

type RoleChangeInput struct {
	UserID string `path:"userId" example:"user_123" doc:"User ID whose role will be changed"`
	Body struct {
		Role string `json:"role" example:"coordinator" doc:"New role to assign"`
	}
}

type RoleChangeOutput struct {
	Message string `json:"message" example:"Role updated" doc:"Status message"`
}

type RolesOutput struct {
	Roles []string `json:"roles" example:"[\"volunteer\",\"coordinator\",\"admin\"]" doc:"Available roles"`
}

type AdminOnlyOutput struct { Message string `json:"message" example:"Admin access granted" doc:"Status message"` }

type CoordinatorOutput struct { Message string `json:"message" example:"Coordinator access granted" doc:"Status message"` }

// RBACHandler with constructor

type RBACHandler struct {
	userService *services.UserService
	api         huma.API
}

func NewRBACHandler(userService *services.UserService, api huma.API) *RBACHandler {
	return &RBACHandler{userService: userService, api: api}
}

func (h *RBACHandler) RoleManagement(ctx context.Context, input *RoleChangeInput) (*RoleChangeOutput, error) {
	if !auth.IsValidRole(input.Body.Role) {
		return nil, huma.Error400BadRequest("Invalid role")
	}
	if err := h.userService.ChangeUserRole(ctx, input.UserID, input.Body.Role); err != nil {
		return nil, huma.Error500InternalServerError("Failed to change role")
	}
	return &RoleChangeOutput{Message: "Role updated"}, nil
}

func (h *RBACHandler) ListRoles(ctx context.Context, input *struct{}) (*RolesOutput, error) {
	return &RolesOutput{Roles: []string{auth.RoleVolunteer, auth.RoleCoordinator, auth.RoleAdmin}}, nil
}

func (h *RBACHandler) AdminOnly(ctx context.Context, input *struct{}) (*AdminOnlyOutput, error) {
	return &AdminOnlyOutput{Message: "Admin access granted"}, nil
}

func (h *RBACHandler) CoordinatorArea(ctx context.Context, input *struct{}) (*CoordinatorOutput, error) {
	return &CoordinatorOutput{Message: "Coordinator access granted"}, nil
}
package handlers

import (
	"context"
)

type ProtectedOutput struct {
	Message string `json:"message" example:"This is a protected endpoint" doc:"Status message for protected route"`
}

type ProtectedHandler struct{}

func NewProtectedHandler() *ProtectedHandler { return &ProtectedHandler{} }

func (h *ProtectedHandler) Test(ctx context.Context, input *struct{}) (*ProtectedOutput, error) {
	return &ProtectedOutput{Message: "This is a protected endpoint"}, nil
}
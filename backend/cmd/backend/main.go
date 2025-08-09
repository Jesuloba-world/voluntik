package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humachi"
	"github.com/go-chi/chi/v5"
	"github.com/redis/go-redis/v9"

	"github.com/voluntik/backend/internal/application/services"
	"github.com/voluntik/backend/internal/config"
	"github.com/voluntik/backend/internal/infrastructure/database"
	"github.com/voluntik/backend/internal/infrastructure/repositories"
	"github.com/voluntik/backend/internal/presentation"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	// Initialize database (uses config.Get() internally)
	database.InitDB()
	defer database.Close()

	// Initialize Redis
	rdb := redis.NewClient(&redis.Options{Addr: cfg.Redis.Addr})
	if err := rdb.Ping(context.Background()).Err(); err != nil {
		log.Fatalf("failed to connect to redis: %v", err)
	}

	// Repositories and services
	userRepo := repositories.NewUserRepository(database.DB)
	userService := services.NewUserService(userRepo)

	// HTTP router and Huma API
	r := chi.NewRouter()
	api := humachi.New(r, huma.DefaultConfig("Voluntik API", "1.0.0"))

	// Routes
	presentation.SetupRoutes(api, userService, rdb, cfg.Server.Environment)

	addr := fmt.Sprintf(":%s", cfg.Server.Port)
	if cfg.Server.Port == "" {
		addr = ":8080"
	}
	log.Printf("Listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
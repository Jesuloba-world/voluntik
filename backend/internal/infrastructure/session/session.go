package session

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type Session struct {
	ID     string    `json:"id"`
	UserID string    `json:"user_id"`
	Role   string    `json:"role"`
	Expiry time.Time `json:"expiry"`
}

type Store struct {
	client *redis.Client
}

func NewStore(client *redis.Client) *Store {
	return &Store{client: client}
}

const (
	sessionPrefix = "session:"
	defaultTTL    = 24 * time.Hour
)

// GenerateSessionID creates a cryptographically secure session ID
func (s *Store) GenerateSessionID() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

// Create stores a new session in Redis
func (s *Store) Create(ctx context.Context, userID, role string) (*Session, error) {
	sessionID, err := s.GenerateSessionID()
	if err != nil {
		return nil, err
	}

	session := &Session{
		ID:     sessionID,
		UserID: userID,
		Role:   role,
		Expiry: time.Now().Add(defaultTTL),
	}

	data, err := json.Marshal(session)
	if err != nil {
		return nil, err
	}

	key := sessionPrefix + sessionID
	if err := s.client.Set(ctx, key, data, defaultTTL).Err(); err != nil {
		return nil, err
	}

	return session, nil
}

// Get retrieves and validates a session from Redis
func (s *Store) Get(ctx context.Context, sessionID string) (*Session, error) {
	key := sessionPrefix + sessionID
	data, err := s.client.Get(ctx, key).Result()
	if err != nil {
		return nil, err
	}

	var session Session
	if err := json.Unmarshal([]byte(data), &session); err != nil {
		return nil, err
	}

	if time.Now().After(session.Expiry) {
		s.Delete(ctx, sessionID)
		return nil, fmt.Errorf("session expired")
	}

	return &session, nil
}

// Update refreshes session expiry
func (s *Store) Update(ctx context.Context, sessionID string) error {
	session, err := s.Get(ctx, sessionID)
	if err != nil {
		return err
	}

	session.Expiry = time.Now().Add(defaultTTL)
	data, err := json.Marshal(session)
	if err != nil {
		return err
	}

	key := sessionPrefix + sessionID
	return s.client.Set(ctx, key, data, defaultTTL).Err()
}

// Delete removes a session from Redis
func (s *Store) Delete(ctx context.Context, sessionID string) error {
	key := sessionPrefix + sessionID
	return s.client.Del(ctx, key).Err()
}

// Cleanup removes expired sessions (can be called periodically)
func (s *Store) Cleanup(ctx context.Context) error {
	keys, err := s.client.Keys(ctx, sessionPrefix+"*").Result()
	if err != nil {
		return err
	}

	for _, key := range keys {
		data, err := s.client.Get(ctx, key).Result()
		if err != nil {
			continue
		}

		var session Session
		if err := json.Unmarshal([]byte(data), &session); err != nil {
			continue
		}

		if time.Now().After(session.Expiry) {
			s.client.Del(ctx, key)
		}
	}
	return nil
}
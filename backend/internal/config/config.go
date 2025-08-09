package config

import (
	"fmt"
	"net/url"
	"os"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	Database DatabaseConfig `mapstructure:"database"`
	Redis    RedisConfig    `mapstructure:"redis"`
	Server   ServerConfig   `mapstructure:"server"`
	Google   GoogleConfig   `mapstructure:"google"`
	JWT      JWTConfig      `mapstructure:"jwt"`
}

type DatabaseConfig struct {
	DSN string `mapstructure:"dsn"`
}

type RedisConfig struct {
	Addr string `mapstructure:"addr"`
}

type ServerConfig struct {
	Port              string `mapstructure:"port"`
	Environment       string `mapstructure:"environment"`
	PostLoginRedirect string `mapstructure:"post_login_redirect"`
}

type GoogleConfig struct {
	ClientID     string `mapstructure:"client_id"`
	ClientSecret string `mapstructure:"client_secret"`
	RedirectURL  string `mapstructure:"redirect_url"`
}

type JWTConfig struct {
	Secret string `mapstructure:"secret"`
}

var cfg *Config

func Load() (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./config")

	// Defaults
	viper.SetDefault("database.dsn", "postgres://voluntik_user:securepassword@localhost:5432/voluntik?sslmode=disable")
	viper.SetDefault("redis.addr", "localhost:6379")
	viper.SetDefault("server.port", "8080")
	viper.SetDefault("server.environment", "development")
	viper.SetDefault("server.post_login_redirect", "/")
	viper.SetDefault("jwt.secret", "your-super-secret-jwt-key")

	// Env support
	viper.SetEnvPrefix("VOLUNTIK")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()

	bindEnvs()

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, err
		}
	}

	// Finalize derived values (e.g., DSN/redis from host/port)
	applyDerived()

	cfg = &Config{}
	if err := viper.Unmarshal(cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}

func bindEnvs() {
	// Legacy envs
	if dsn := os.Getenv("POSTGRES_DSN"); dsn != "" {
		viper.Set("database.dsn", dsn)
	}
	if redisAddr := os.Getenv("REDIS_ADDR"); redisAddr != "" {
		viper.Set("redis.addr", redisAddr)
	}
	if port := os.Getenv("PORT"); port != "" {
		viper.Set("server.port", port)
	}
	if env := os.Getenv("ENV"); env != "" {
		viper.Set("server.environment", env)
	}
	if redirect := os.Getenv("POST_LOGIN_REDIRECT"); redirect != "" {
		viper.Set("server.post_login_redirect", redirect)
	}
	if clientID := os.Getenv("GOOGLE_CLIENT_ID"); clientID != "" {
		viper.Set("google.client_id", clientID)
	}
	if clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET"); clientSecret != "" {
		viper.Set("google.client_secret", clientSecret)
	}
	if redirectURL := os.Getenv("GOOGLE_REDIRECT_URL"); redirectURL != "" {
		viper.Set("google.redirect_url", redirectURL)
	}
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		viper.Set("jwt.secret", secret)
	}

	// New envs with prefix
	_ = viper.BindEnv("database.dsn", "VOLUNTIK_DATABASE_DSN")
	_ = viper.BindEnv("redis.addr", "VOLUNTIK_REDIS_ADDR")
	_ = viper.BindEnv("server.port", "VOLUNTIK_SERVER_PORT")
	_ = viper.BindEnv("server.environment", "VOLUNTIK_SERVER_ENVIRONMENT")
	_ = viper.BindEnv("server.post_login_redirect", "VOLUNTIK_SERVER_POST_LOGIN_REDIRECT")
	_ = viper.BindEnv("google.client_id", "VOLUNTIK_GOOGLE_CLIENT_ID")
	_ = viper.BindEnv("google.client_secret", "VOLUNTIK_GOOGLE_CLIENT_SECRET")
	_ = viper.BindEnv("google.redirect_url", "VOLUNTIK_GOOGLE_REDIRECT_URL")
	_ = viper.BindEnv("jwt.secret", "VOLUNTIK_JWT_SECRET")

	// Also honor common container vars
	if host := os.Getenv("REDIS_HOST"); host != "" {
		port := os.Getenv("REDIS_PORT")
		if port == "" {
			port = "6379"
		}
		viper.Set("redis.addr", fmt.Sprintf("%s:%s", host, port))
	}
	if host := os.Getenv("DB_HOST"); host != "" {
		viper.Set("database.db_host", host) // temp for applyDerived
	}
	if port := os.Getenv("DB_PORT"); port != "" {
		viper.Set("database.db_port", port) // temp for applyDerived
	}
}

func applyDerived() {
	// If DB_HOST/DB_PORT provided, update DSN host:port while preserving user/pass/dbname/params
	dsn := viper.GetString("database.dsn")
	u, err := url.Parse(dsn)
	if err == nil && u.Scheme != "" {
		host := viper.GetString("database.db_host")
		port := viper.GetString("database.db_port")
		if host != "" {
			if port != "" {
				u.Host = fmt.Sprintf("%s:%s", host, port)
			} else {
				u.Host = host
			}
			viper.Set("database.dsn", u.String())
		}
	}
}

func Get() *Config {
	return cfg
}
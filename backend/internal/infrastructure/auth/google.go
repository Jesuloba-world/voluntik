package auth

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"io"
	"net/http"

	"github.com/voluntik/backend/internal/config"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig *oauth2.Config

type GoogleUserInfo struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

func GetGoogleOAuthConfig() *oauth2.Config {
	if googleOauthConfig == nil {
		c := config.Get()
		googleOauthConfig = &oauth2.Config{
			RedirectURL:  c.Google.RedirectURL,
			ClientID:     c.Google.ClientID,
			ClientSecret: c.Google.ClientSecret,
			Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
			Endpoint:     google.Endpoint,
		}
	}
	return googleOauthConfig
}

func GenerateOAuthState() (string, error) {
	b := make([]byte, 16)
	_, err := rand.Read(b)
	return base64.URLEncoding.EncodeToString(b), err
}

func GetGoogleUserInfo(client *http.Client) (*GoogleUserInfo, error) {
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var info GoogleUserInfo
	err = json.Unmarshal(body, &info)
	return &info, err
}

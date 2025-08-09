package database
import (
	"testing"
	"time"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)
func TestOrganizationValidation(t *testing.T) {
	tests := []struct {
		name string
		org Organization
		expectError bool
	}{
		{"Valid", Organization{ID: uuid.NewString(), Name: "Test Org"}, false},
		{"Missing Name", Organization{ID: uuid.NewString(), Name: ""}, true},
		{"Name Too Long", Organization{ID: uuid.NewString(), Name: string(make([]byte, 256))}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.org)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestUserValidation(t *testing.T) {
	tests := []struct {
		name string
		user User
		expectError bool
	}{
		{"Valid", User{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Email: "test@example.com", Role: "admin"}, false},
		{"Invalid Email", User{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Email: "invalid", Role: "admin"}, true},
		{"Invalid Role", User{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Email: "test@example.com", Role: "invalid"}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.user)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestEventValidation(t *testing.T) {
	tests := []struct {
		name string
		event Event
		expectError bool
	}{
		{"Valid", Event{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Title: "Test Event"}, false},
		{"Missing Title", Event{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Title: ""}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.event)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestTimeSlotValidation(t *testing.T) {
	start := time.Now()
	end := start.Add(time.Hour)
	tests := []struct {
		name string
		slot TimeSlot
		expectError bool
	}{
		{"Valid", TimeSlot{ID: uuid.NewString(), EventID: uuid.NewString(), StartTime: start, EndTime: end}, false},
		{"End Before Start", TimeSlot{ID: uuid.NewString(), EventID: uuid.NewString(), StartTime: end, EndTime: start}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.slot)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestVolunteerAssignmentValidation(t *testing.T) {
	tests := []struct {
		name string
		va VolunteerAssignment
		expectError bool
	}{
		{"Valid", VolunteerAssignment{ID: uuid.NewString(), UserID: uuid.NewString(), TimeSlotID: uuid.NewString(), Status: "confirmed"}, false},
		{"Invalid Status", VolunteerAssignment{ID: uuid.NewString(), UserID: uuid.NewString(), TimeSlotID: uuid.NewString(), Status: "invalid"}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.va)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestHourLogValidation(t *testing.T) {
	tests := []struct {
		name string
		hl HourLog
		expectError bool
	}{
		{"Valid", HourLog{ID: uuid.NewString(), AssignmentID: uuid.NewString(), Hours: 2.5}, false},
		{"Invalid Hours", HourLog{ID: uuid.NewString(), AssignmentID: uuid.NewString(), Hours: 0}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.hl)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestCommunicationTemplateValidation(t *testing.T) {
	tests := []struct {
		name string
		ct CommunicationTemplate
		expectError bool
	}{
		{"Valid", CommunicationTemplate{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Name: "Test", Content: "Content", Type: "email"}, false},
		{"Missing Content", CommunicationTemplate{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Name: "Test", Content: "", Type: "email"}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.ct)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestCommunicationLogValidation(t *testing.T) {
	tests := []struct {
		name string
		cl CommunicationLog
		expectError bool
	}{
		{"Valid", CommunicationLog{ID: uuid.NewString(), UserID: uuid.NewString(), Status: "sent"}, false},
		{"Invalid Status", CommunicationLog{ID: uuid.NewString(), UserID: uuid.NewString(), Status: "invalid"}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.cl)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestPaymentSubscriptionValidation(t *testing.T) {
	start := time.Now()
	end := start.AddDate(1, 0, 0)
	tests := []struct {
		name string
		ps PaymentSubscription
		expectError bool
	}{
		{"Valid", PaymentSubscription{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Plan: "premium", Status: "active", StartDate: start, EndDate: end}, false},
		{"Invalid Plan", PaymentSubscription{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Plan: "invalid", Status: "active", StartDate: start}, true},
		{"End Before Start", PaymentSubscription{ID: uuid.NewString(), OrganizationID: uuid.NewString(), Plan: "premium", Status: "active", StartDate: end, EndDate: start}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.ps)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
func TestFeatureFlagValidation(t *testing.T) {
	tests := []struct {
		name string
		ff FeatureFlag
		expectError bool
	}{
		{"Valid", FeatureFlag{ID: uuid.NewString(), OrganizationID: uuid.NewString(), FlagName: "test_flag", Enabled: true}, false},
		{"Missing FlagName", FeatureFlag{ID: uuid.NewString(), OrganizationID: uuid.NewString(), FlagName: ""}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateStruct(tt.ff)
			if (err != nil) != tt.expectError {
				t.Errorf("expected error: %v, got: %v", tt.expectError, err)
			}
		})
	}
}
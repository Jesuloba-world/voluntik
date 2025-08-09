# Multi-Tenant Database Schema Design

## Overview
This schema uses a shared database with organization_id as the tenant discriminator on all tenant-specific tables. Row Level Security (RLS) will be used for tenant isolation.

## Tables

### organizations
- id: UUID PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### users
- id: UUID PRIMARY KEY
- organization_id: UUID NOT NULL REFERENCES organizations(id)
- email: VARCHAR(255) NOT NULL UNIQUE
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- role: ENUM('volunteer', 'coordinator', 'admin') NOT NULL
- social_auth_provider: VARCHAR(50)
- social_auth_id: VARCHAR(255)
- created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### events
- id: UUID PRIMARY KEY
- organization_id: UUID NOT NULL REFERENCES organizations(id)
- title: VARCHAR(255) NOT NULL
- description: TEXT
- location: VARCHAR(255)
- created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### time_slots
- id: UUID PRIMARY KEY
- event_id: UUID NOT NULL REFERENCES events(id)
- start_time: TIMESTAMP NOT NULL
- end_time: TIMESTAMP NOT NULL
- capacity: INTEGER

### volunteer_assignments
- id: UUID PRIMARY KEY
- user_id: UUID NOT NULL REFERENCES users(id)
- time_slot_id: UUID NOT NULL REFERENCES time_slots(id)
- status: ENUM('assigned', 'completed', 'cancelled') NOT NULL

### hour_logs
- id: UUID PRIMARY KEY
- assignment_id: UUID NOT NULL REFERENCES volunteer_assignments(id)
- hours: DECIMAL(5,2) NOT NULL
- logged_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

### communication_templates
- id: UUID PRIMARY KEY
- organization_id: UUID NOT NULL REFERENCES organizations(id)
- name: VARCHAR(255) NOT NULL
- content: TEXT NOT NULL
- type: ENUM('email', 'sms') NOT NULL

### communication_logs
- id: UUID PRIMARY KEY
- template_id: UUID REFERENCES communication_templates(id)
- user_id: UUID NOT NULL REFERENCES users(id)
- sent_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- status: ENUM('sent', 'failed')

### payment_subscriptions
- id: UUID PRIMARY KEY
- organization_id: UUID NOT NULL REFERENCES organizations(id)
- plan: ENUM('basic', 'premium') NOT NULL
- status: ENUM('active', 'cancelled') NOT NULL
- start_date: DATE NOT NULL
- end_date: DATE

### feature_flags
- id: UUID PRIMARY KEY
- organization_id: UUID NOT NULL REFERENCES organizations(id)
- flag_name: VARCHAR(100) NOT NULL
- enabled: BOOLEAN NOT NULL DEFAULT FALSE

## Relationships
- users -> organizations (many-to-one)
- events -> organizations (many-to-one)
- time_slots -> events (many-to-one)
- volunteer_assignments -> users (many-to-one), time_slots (many-to-one)
- hour_logs -> volunteer_assignments (many-to-one)
- communication_templates -> organizations (many-to-one)
- communication_logs -> communication_templates (many-to-one), users (many-to-one)
- payment_subscriptions -> organizations (many-to-one)
- feature_flags -> organizations (many-to-one)

## Tenant Isolation Strategy
- Add organization_id to all tenant-specific tables.
- Implement RLS policies on each table to filter rows where organization_id matches the current tenant's ID.
- Use PostgreSQL roles or session variables to set the current tenant context.
- Ensure all queries are tenant-aware.
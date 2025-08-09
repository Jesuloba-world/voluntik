-- Initial database setup for Voluntik

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable trigram search for efficient text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Additional initial configurations can be added here
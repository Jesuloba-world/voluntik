# Voluntik

Voluntik is a volunteer coordination platform designed to connect volunteers, coordinators, and administrators to organize community initiatives efficiently.

## Vision

A simple, modern system for planning events, publishing volunteer opportunities, managing shifts, and tracking participation and impact.

## Roles & Access

- Volunteer: browse and sign up for opportunities, manage profile and availability.
- Coordinator: create opportunities, manage applications, assign shifts, communicate with volunteers.
- Admin: oversee the platform, manage users and roles, moderate content, and review analytics.

## Core Features (planned)

- Authentication: email/password and Google sign-in with sessions & JWT for API access.
- Role-based access control (RBAC): Volunteer, Coordinator, Admin permissions.
- Opportunities & Shifts: create, schedule, assign, and track attendance.
- Applications & Approvals: volunteers apply; coordinators review and approve.
- Notifications: email or in-app updates about assignments and changes.
- Basic analytics: participation metrics and event summaries.

## High-Level Architecture

- Backend (Go):
  - HTTP API with Huma (OpenAPI-first) on Chi router.
  - PostgreSQL (via Bun ORM) for core data.
  - Redis for sessions and short-lived state.
  - JWT-based auth for protected endpoints; cookie sessions for the web app.
- Frontend (Next.js + TypeScript):
  - Modern UI, server components, Tailwind CSS.
  - Integrates with backend API for auth and data.
- DevOps:
  - Docker compose for local dev (API, DB, Redis, frontend, reverse proxy).
  - Environment-specific compose files for staging/prod.

## API Design

- OpenAPI-driven endpoints with typed inputs/outputs.
- Grouped routes for health, auth, session, protected resources, and RBAC-protected admin tools.

## Project Structure (simplified)

- backend: Go API, domain, infrastructure, and presentation layers.
- frontend: Next.js app.
- docker: Dockerfiles and compose configs.
- database: SQL initialization and schema notes.

## Status

Early-stage scaffold meant to grow into a full-featured volunteer management platform. The README describes the intent and planned capabilities.

FROM postgres:16-alpine

# Set environment variables
ENV POSTGRES_DB=voluntik
ENV POSTGRES_USER=voluntik_user
ENV POSTGRES_PASSWORD=securepassword

# Copy initialization scripts if any
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose port
EXPOSE 5432
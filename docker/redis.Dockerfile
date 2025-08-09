FROM redis:7-alpine

# Copy custom configuration
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Enable persistence (AOF or RDB)
CMD ["redis-server", "--appendonly", "yes"]

# Expose port
EXPOSE 6379
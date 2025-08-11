FROM docker.dragonflydb.io/dragonflydb/dragonfly:latest

# Dragonfly automatically handles persistence and memory management
CMD ["dragonfly", "--logtostderr"]

# Expose port
EXPOSE 6379
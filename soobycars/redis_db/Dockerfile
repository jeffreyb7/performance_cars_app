# syntax=docker/dockerfile:1
FROM redis
WORKDIR /data/configdb
COPY ["redis.conf", "./"]
WORKDIR /data
CMD [ "redis-server", "./configdb/redis.conf" ]

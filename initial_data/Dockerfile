# syntax=/docker/dockerfile:1
FROM redis
RUN ["mkdir", "fast_data"]
WORKDIR /fast_data
COPY ["data_as_protocol.txt", "load_bulk_data.sh", "/fast_data/"]
CMD ./load_bulk_data.sh

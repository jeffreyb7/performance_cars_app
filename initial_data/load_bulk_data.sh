#!/bin/bash

while :
do
    echo "Pinging redis"
    db_ready=$(printf "PING" | redis-cli -h redisdb)
	query_status=$?
    echo "Query status is $query_status"
    echo "DB response is $db_ready"
	if [[ $query_status -eq 0 ]] && [[ "$db_ready" = "PONG" ]] 
	then 
		break
	else
        echo "Sleeping 5"
		sleep 5
	fi
done

is_data_loaded=$(printf "EXISTS Hp" | redis-cli -h redisdb)

if [[ $is_data_loaded -eq 0 ]]
then
	cat /fast_data/data_as_protocol.txt | redis-cli -h redisdb --pipe
fi


#!/bin/bash

while :
do
	db_ready=$(printf "PING" | redis-cli -h redisdb)
	query_status=$?
	if [[ $query_status -eq 0 ]]
	then
		break
	else
		sleep 5
	fi
done

is_data_loaded=$(printf "EXISTS Hp" | redis-cli -h redisdb)

if [[ $is_data_loaded -eq 0 ]]
then
	cat /fast_data/data_as_protocol.txt | redis-cli -h redisdb --pipe
fi


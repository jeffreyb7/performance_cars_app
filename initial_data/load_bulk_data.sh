#!/bin/bash

is_data_loaded=$(printf "EXISTS Hp" | redis-cli)

if [[ $is_data_loaded -eq 0 ]]
then cat /fast_data/data_as_protocol.txt | redis-cli -h redisdb --pipe
fi


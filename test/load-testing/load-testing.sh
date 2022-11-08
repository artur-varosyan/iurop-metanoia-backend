#!/bin/bash
echo "Starting load testing"
timestamp=`date +"%Y-%m-%d-%T"`
mkdir results/$timestamp
for vus in 10 1 2 5 10 20 40 60 80 100 200 400 600 800 1000
do 
    echo "Testing $vus user(s)..."
    k6 run load-testing.js --vus=$vus > results/$timestamp/results$vus.txt
    echo "Finished testing, taking a break..."
    sleep 30
done
echo "All tests done"
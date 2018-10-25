#!/bin/bash
./startFabric.sh
docker stop dev-peer0.org1.example.com-tuna-app-1.0 cli peer0.org1.example.com couchdb 
docker rm dev-peer0.org1.example.com-tuna-app-1.0 cli peer0.org1.example.com couchdb 

#!/bin/bash

clear_docker () {
  docker rm $(docker ps -a -q)
  docker image rm incercareproiect_apigateway
  docker image rm incercareproiect_auth-service
  docker image rm incercareproiect_clients-service
  docker image rm incercareproiect_io-service
  docker volume rm incercareproiect_db-persistent-volume
  docker network rm incercareproiect_clients-io-network
  docker network rm incercareproiect_auth-clients-network
  docker network rm incercareproiect_db-adminer-network
  docker network rm incercareproiect_gateway-clients-network
  docker network rm incercareproiect_gateway-auth-network
  docker network rm incercareproiect_io-db-network
}

clear_docker
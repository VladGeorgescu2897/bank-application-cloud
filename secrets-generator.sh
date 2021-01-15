#!/bin/bash

printf "admin" | docker secret create bank-db-user-secret -

printf "admin" | docker secret create bank-db-password-secret -

printf "student" | docker secret create jwt-issuer-secret -

printf "myawesomeultrasecretkey" | docker secret create jwt-secret-key-secret -

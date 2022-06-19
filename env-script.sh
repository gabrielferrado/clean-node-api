#!/bin/sh

touch .env
{
  printf "MONGO_URL=%s\nPORT=%s" "$ARG_ENV_SECRET" "$ARG_ENV_SECRET_1"
} >> .env

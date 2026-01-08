#!/bin/bash

# PRELOAD

handle_error() {
    echo ""
    echo -e "Error in line: $1. STOPPED"
    exit 1
}

trap 'handle_error $LINENO' ERR
set -e 

if [[ -f .env ]]; then
    export $(grep -v '^#' .env | xargs)
else
    exit 1
fi

USER_ID=$(id -u)
GROUP_ID=$(id -g)

NETWORK_NAME="dyplomowa_net-public"
STRAPI_URL="${PRIVATE_STRAPI_URL:-http://srv-strapi:1337}"

WORK_DIR="/app"
LOCALES_DIR_NAME="./apps/nextjs"
SCRIPT_PATH="src/components/lib/update-locales.ts"
LOCALES_PATH="src/config/locales.json"

mkdir -p "$LOCALES_DIR_NAME"

docker run --rm -v "$LOCALES_DIR_NAME:$WORK_DIR" -w "$WORK_DIR" --network "$NETWORK_NAME" -e LOCALES_PATH="$LOCALES_PATH" -e PRIVATE_STRAPI_URL="$STRAPI_URL" -e SCRIPT_PATH="$SCRIPT_PATH" -e UID="$USER_ID" -e GID="$GROUP_ID" node:22-alpine sh -c '
 npx -y tsx "$SCRIPT_PATH" && \
 if [ -f "$LOCALES_PATH" ]; then
    chown "$UID":"$GID" "$LOCALES_PATH" && \
    chmod 644 "$LOCALES_PATH"
 fi
'
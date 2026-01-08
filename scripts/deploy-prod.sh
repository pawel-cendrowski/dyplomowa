#!/bin/bash

# DEPLOY PROD - AUTORUN

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

echo "Stage 1 - Verifying SSL certificate"

if [[ ! -f "./ssl/dyplomowa.crt" ]]; then
    echo "No issued certificates found."
    echo "A new certificate is being generated..."
    npm run ssl:generate
fi

echo "Stage 2 - Starting backend infrastructure"

docker compose -f docker-compose.prod.yaml up -d srv-strapi-db

while [ "$(docker inspect -f '{{.State.Health.Status}}' srv-strapi-db 2>/dev/null)" != "healthy" ]; do
    sleep 1
    echo -n "."
done

echo "Database: Reconstructing - please wait..."
npm run db:backup-restore
echo "Database: Reconstruction - done"


NEXTJS_DIR="./apps/nextjs"
STRAPI_DIR="./apps/strapi"


docker compose -f docker-compose.prod.yaml up -d srv-strapi

while [ "$(docker inspect -f '{{.State.Health.Status}}' srv-strapi 2>/dev/null)" != "healthy" ]; do
    sleep 1
    echo -n "."
done


bash ./scripts/config-locales-preload.sh


echo "Starting remaining program components..."
docker compose -f docker-compose.prod.yaml up -d --build srv-nextjs srv-nginx








#!/bin/bash

# DATABASE MAKE

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

CONTAINER_NAME="${STRAPI_DATABASE_HOST}" #"srv-strapi-db"
DB_USER="${STRAPI_POSTGRES_USER}" #"admin"
DB_NAME="${STRAPI_POSTGRES_DB}" #"dyplomowa_db_strapi"

BACKUP_FILE_PATH="./apps/database/dbstrapi/backup/backup.sql"

if [[ ! $(docker ps -q -f name=$CONTAINER_NAME) ]]; then
    echo "The database container is not running."
    exit 1
fi

DIRS=$(dirname "$BACKUP_FILE_PATH")
mkdir -p "$DIRS"

if docker exec -i $CONTAINER_NAME pg_dump -U $DB_USER -d $DB_NAME > "$BACKUP_FILE_PATH"; then
    echo "Database backup completed successfully."
    else
    echo "Failed to create database backup."
    exit 2
fi
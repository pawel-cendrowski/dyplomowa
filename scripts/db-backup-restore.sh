#!/bin/bash

# DATABASE RESTORE

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


# Czy istnieje plik backupu

if [[ ! -f "$BACKUP_FILE_PATH" ]]; then
    echo "The database backup file does not exist."
    exit 2
fi

# Czy istnieje uruchomiony kontener obsługujący bazę danych

if [[ ! $(docker ps -q -f name=$CONTAINER_NAME) ]]; then
    echo "The database container is currently not running."
    echo "You can run it using the following command: docker compose up -d srv-strapi-db"
    exit 3
fi

# Ubij dostępne połączenia dla bazy danych, która zostanie poddana przetworzeniu (przywróceniu)

docker exec -i $CONTAINER_NAME psql -U $DB_USER -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='$DB_NAME' AND pid <> pg_backend_pid();" > /dev/null

# Usuń dotychczasową bazę danych o tej nazwie, jeśli istnieje

docker exec -i $CONTAINER_NAME psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Utwórz bazę danych od nowa

docker exec -i $CONTAINER_NAME psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"

# Wypełnij bazę danymi backupu

if docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME < "$BACKUP_FILE_PATH" > /dev/null; then
    echo "Database restoration was successful!"
else
    echo "Failed to restore the database!"
    exit 4
fi
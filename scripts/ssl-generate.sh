#!/bin/bash

# SSL GENERATE

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

CERT_DIR_NAME="/certs"
CERT_DIR_NAME_HOST="./ssl"

USER_ID=$(id -u)
GROUP_ID=$(id -g)

if ! command -v docker; then
    echo "Docker could not be found."
    exit 2
fi

echo "Verifying destination directory structure..."

mkdir -p "$CERT_DIR_NAME_HOST"

echo "Certificate generation in progress..."

docker run --rm -v "$CERT_DIR_NAME_HOST:$CERT_DIR_NAME" -e CERT_DIR="$CERT_DIR_NAME" -e UID="$USER_ID" -e GID="$GROUP_ID" alpine sh -c '
apk add --no-cache openssl && \
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$CERT_DIR/dyplomowa.key" \
    -out "$CERT_DIR/dyplomowa.crt" \
    -subj "/C=PL/ST=Mazowieckie/L=Warszawa/O=MojaFirma/OU=IT/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,DNS:cms.localhost,DNS:*.localhost" && \

chown $UID:$GID "$CERT_DIR/dyplomowa.key" "$CERT_DIR/dyplomowa.crt" && \
chmod 644 "$CERT_DIR/dyplomowa.key" "$CERT_DIR/dyplomowa.crt"
'

echo "Generated files:"
ls -l "$CERT_DIR_NAME_HOST"
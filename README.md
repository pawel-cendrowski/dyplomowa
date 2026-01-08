# Praca Dyplomowa

Paweł Cendrowski

Album 7386

Warszawska Wyższa Szkoła Informatyki


## Temat: "Implementacja aplikacji internetowej w środowisku kontenerowym"

Zakres pracy:

1. Projekt architektury mikroserwisowej
2. Konfiguracja serwera Nginx w celu oddelegowania obsługi ruchu
3. Implementacja logiki aplikacji i renderowania w frameworku Next.js
4. Integracja treści z wykorzystaniem Headless CMS Strapi
5. Automatyzacja procesów wdrożeniowych




## Skrypty automatyczne


    Uruchomienie projektu:
    "deploy:dev": "bash ./scripts/deploy-dev.sh",
    "deploy:prod": "bash ./scripts/deploy-prod.sh",

    Zatrzymanie projektu:
    "stop:dev": "docker compose -f docker-compose.dev.yaml down",
    "stop:prod": "docker compose -f docker-compose.prod.yaml down",

    Czyszczenie obrazów zbudowanego prokejektu (dev | prod)
    "clean": "docker system prune -a -f",

    Skrypty pomocnicze (zgodne z nazwą):
    "ssl:generate": "bash ./scripts/ssl-generate.sh",
    "db:backup-make": "bash ./scripts/db-backup-make.sh",
    "db:backup-restore": "bash ./scripts/db-backup-restore.sh"

## Przykład:

Uruchomienie:

npm run deploy:prod

Zatrzymanie:

npm run stop:prod

Czyszczenie:

npm run clean


## Informacja

Uruchomienie skryptu deploy:dev lub deploy:prod wykonuje skrypt regenerujący bazę danych na podstawie pliku backup.sql zawartego w katalogu 'database/dbstrapi/backup/backup.sql'
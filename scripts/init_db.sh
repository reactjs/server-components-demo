#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE ROLE notesadmin WITH LOGIN PASSWORD 'password';
    ALTER ROLE notesadmin WITH SUPERUSER;
    ALTER DATABASE notesapi OWNER TO notesadmin;

    DROP TABLE IF EXISTS notes;
    CREATE TABLE notes (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      title TEXT,
      body TEXT
    );
EOSQL

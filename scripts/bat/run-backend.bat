
@echo off

set opp=%1


if "%opp%"=="dropandrun" (
    :: Drop and recreate macbeth_db db
    set PGPASSWORD=123&& psql -U postgres -c "DROP DATABASE macbeth_db"
    set PGPASSWORD=123&& psql -U postgres -c "CREATE DATABASE macbeth_db"
    set PGPASSWORD=123&& psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE macbeth_db to postgres"

    :: Perform migrations
    python .\manage.py makemigrations macbeth_backend
    python .\manage.py makemigrations macbeth_api
    python .\manage.py migrate

    :: Run server
    python .\manage.py runserver
) else if "%opp%"=="test" (
    python .\manage.py test .\macbeth_backend
    python .\manage.py test .\macbeth_api
    python .\manage.py test .\macbeth_core
) else (
    echo Please enter parameter
)
# How to Set Up Project with Database

The database being used is PostgreSQL. I am using the 
terminal interface to interact with it, `psql`. Installation details
can be found here:  

https://www.postgresql.org/docs/9.3/tutorial-install.html

Additionally, you can install for Linux and MacOS:

## Install PSQL

### MacOS (Brew)

`brew install postgresql`

### Linux Ubuntu

This was pulled from: https://www.postgresql.org/download/linux/ubuntu/

```
# Create the file repository configuration:
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
sudo apt-get update

# Install the latest version of PostgreSQL.
# If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':
sudo apt-get -y install postgresql
```

## Setting up PostgreSQL

For this project, I am using the standard `postgres` user with password `123`.
Settings describing the database name, username, and password can be found in
[settings.py](../macbeth/django_project/settings.py) under the global variable
`DATABASES`. To change password to match these you can do the following:

`psql -U postgres -c "ALTER USER postgres PASSWORD '123';"`

## Running the Script

I made a script [run.sh](../macbeth/run.sh) that can drop, create, and run the project.
You may have to `source run.sh` the script for it to work properly.

Examples:

`./run.sh dropandrun` will drop database, create a new one, make its migrations, and run it.
`./run.sh dropdb` will drop database.
`./run.sh test` will run tests for project (uses django tests, making a temporary database for testing).
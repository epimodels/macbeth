#! /bin/sh

## This script is meant to help run repetitive commands.
## NOTE: if getting an error saying `macbeth_backend_user` table not made,
## RUN: ./manage.py makemigrations macbeth_backend
## Postgres DB Info

USERNAME=postgres
PASSWORD=123
DBNAME=macbeth_db
PORT=5432 			# 5432 is default

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Argument Names

DROPDB=dropdb
CREATDB=creatdb
TEST=test
HELP=help
DROPANDRUN=dropandrun

complete -W "${DROPDB} ${CREATDB} ${HELP} ${DROPANDRUN} ${TEST}" ./run.sh

# To login to psql without supplying password
export PGPASSWORD=${PASSWORD}

help()
{
	echo ${GREEN}----------- Help -----------${NC}
	echo "${GREEN}Syntax:${NC} run.sh [ <NONE> | ${DROPDB} | ${CREATDB} ]"
	echo "${GREEN}Globals given to script:${NC}"
	echo "   - USERNAME: ${USERNAME}"
	echo "   - PASSWORD: ${PASSWORD}"
	echo "   - PORT: 	${PORT}"
	echo "   - DBNAME:	${DNAME}"
	echo "${GREEN}Args:${NC}"
	echo "   - <NONE>"
	echo "      No parameter passed in. Will runserver for the project."
	echo "   - ${DROPDB}"
	echo "      Drops the database ${DBNAME}, creates a new one under "
	echo "      the same name and runs the project."
	echo "   - ${CREATDB}"
	echo "      Creates the database ${DBNAME}. Should only be called if"
	echo "      the database does not yet exist."
}

drop_db()
{
	echo ${RED}Dropping database: ${NC}${DBNAME}

 	psql -U ${USERNAME} -c "DROP DATABASE ${DBNAME}";

	echo ${GREEN}Done.${NC}
}

creat_db()
{
	echo ${RED}Creating database: ${NC}${DBNAME}
	echo ${RED}With username: ${NC}${USERNAME}
	echo ${RED}With password: ${NC}${PASSWORD}

	psql -U ${USERNAME} -c "CREATE DATABASE ${DBNAME}"
	psql -U ${USERNAME} -p ${PORT} -d ${DBNAME} -c "GRANT ALL PRIVILEGES ON DATABASE ${DBNAME} TO ${USERNAME}"

	echo ${GREEN}Done.${NC}
}

do_migrations()
{
	echo ${RED}Running migrations...${NC}
	./manage.py makemigrations macbeth_backend
	./manage.py makemigrations macbeth_api
	./manage.py migrate
	echo ${GREEN}Done.${NC}
}

if [[ $# -eq 0 ]] ; then
	echo Calling ./manage.py runserver
	./manage.py runserver
	exit 0
fi

while [[ $# -gt 0 ]] ; do

	case "$1" in
		${HELP})
			help
 			;;
 		${TEST})
 			./manage.py test ./macbeth_backend
			./manage.py test ./macbeth_api
 			;;
 		${DROPDB})
 			drop_db
 			;;
 		${CREATDB})
 			creat_db
			do_migrations
 			;;
 		${DROPANDRUN})
 			drop_db
 			creat_db
			do_migrations
 			./manage.py runserver
 			;;
 		*)
 			echo ${RED}Unknown command: ${NC}$1.
 			break;
 			;;
 	esac
 	shift

done


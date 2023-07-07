#!/bin/bash
source .env

docker exec -it powerflex-db-1 bash -c "mysql -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DB < data/seed_factory_data.sql"
docker exec -it powerflex-db-1 bash -c "mysql -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DB < data/seed_sprocket_types.sql"
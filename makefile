DATABASE=lifekit
MODELDIR=./models2

run:
	node server.js

dev:
	nodeman server.js

deploy:
	sequelize-auto -h localhost -d ${DATABASE} -u lifekit -x guptagroup -o ${MODELDIR} -e mysql


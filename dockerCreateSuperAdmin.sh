#!/bin/bash
docker cp api/createSuperAdmin.js polygaroo_mongo_1:/
docker exec -it polygaroo_mongo_1 mongo restpolygaroo createSuperAdmin.js

exit 0
## Создать seed

> npx sequelize-cli seed:generate --name demo-user

## Запуск seed

> npx sequelize-cli db:seed --seed my_seeder_file.js (single file)

> npx sequelize-cli db:seed:all (all seed files in the dir)

## Откат seed

> npx sequelize-cli db:seed:undo

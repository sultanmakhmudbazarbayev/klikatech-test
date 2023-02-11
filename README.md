  <br />
<div align="center">
  <h3 align="center">Test Project For Klika Tech</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Music App]](https://sulacy-test.katsu-admin.kz/) (if I can say like that)

I wanted to do so much more but I haven't had enough time.
Backend and fronted were done within 15-16 hours. I aknowledge lack of experience with react, it took way too long than I expected.

Here's why:

- There are configuration files for Docker images, and I tried to configure docker-compose with migrations and seeders, but errors were coming one after another, and I stopped when it come to errors related to migrations. It took me around 4-5 hours to figure out that migrations were running before api were connected to database.
- Next problem is seeders, I coudn't find a possible version of running seeders inside a docker so container will always restart properly.
- Filtration part of backend was also done in a hurry.
- I was looking for music datasets and some time were spent to formatting of csv file.
- Here will be instructions of downloading and setting up the project.

## Getting Started

### Prerequisites

There are 2 ways to run this project: "docker compose up" and manually setup. Firstly manual setup will be explaned below.

if you want to setup manually, you must have Postgresql, Nodejs installed on your local computer. You may need create new user, database and grant all privilliges for database to corresponding user.

Here is example how you can do it on Linux/Ubuntu:

```js
/// Enter psql console
sudo sudo -u postgres psql

/// Create user, database and grant privilliges
CREATE USER klika WITH SUPERUSER PASSWORD 'password';
CREATE DATABASE klikatech;
GRANT ALL PRIVILEGES ON DATABASE "klikatech" to klika;
```

### Installation

_Below there are instructions of how to run project._

2. Clone the repo
   ```
   git clone https://github.com/sultanmakhmudbazarbayev/klikatech-test.git
   ```
3. Run backend part

   ```js
   cd klikatech-test/server && npm install

   /// After installation of packages you have to run migrations and seeders
   /// If you set up user and password different from above, you have to change
   /// them inside package.json scripts where needed and .env.production

   npm run migrate:prod

   /// Seed artists
   PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205736-add-artists.js

   /// Seed genres
   PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205814-add-genres.js

   /// Seed songs
   PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205820-add-songs.js
   ```

4. After that you should be able to run backend part of the project:

   ```js
   npm run start:prod
   ```

5. Run frontend part

   ```js
   cd ~/klikatech-test/client && npm install

   /// you can run
   npm run start

   /// And change the url of backend part inside .env file
   /// Otherwise it will be connected to backend hosted by server
   ```

6. After that you should be able to run backend part of the project:

   ```js
   /// And see project on the sorresponding url.
   npm run start:prod
   ```

## Additional info

Frontend part served by simple Nodejs server separate from backend server.
Both backend and frontend parts are hosted by AWS/EC2 instance and behind Nginx reverse proxy, both have domain names.

url for backend is:
https://sulacy-test-back.katsu-admin.kz/

it includes two simple routes:

```sh
  /// For getting all available genres

  https://sulacy-test-back.katsu-admin.kz/music/genres

```

```sh
  /// For getting all available music

  https://sulacy-test-back.katsu-admin.kz/music/

```

Route above includes filtration by query parameters which are:

genre_id - id of already existing genre in database
artist_name - any string
year - integer desired, but string also works
song - any string

## Using docker compose

If you want to use "docker compose up" there are 3 steps to do it, but before ensure that **Postgresql service is stopped and port 5432 has no running processes**.

1. After clonning the repo run:

   ```
   cd klikatech-test && docker compose up
   ```

   It will run all three containers correctly, but when adding seeders to database container api will be exited, because of "restart:no"
   It would've restarted trying to seed database again and receive errors.

   So it's best to exit all containers by CTRL+C or corresponding combination on your laptop, or to write docker compose down _without deleting pgdb_data folder_

2. Before second attempt to restart you should comment "command" on api image:

   Comment following lines in docker-compose.yml:

   ```
    27  #  command: >
    28  #    sh -c "npm run migrate:prod &&
    29  #       PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205736-add-artists.js &&
    30  #       PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205814-add-genres.js &&
    31  #       PG_PASSWORD=password PG_USER=klika PG_DATABASE=klikatech npx sequelize-cli db:seed --seed 20230209205820-add-songs.js"
   ```

3. Run docker compose again:
   ```
    docker compose up
   ```

And You should be able to see my work in http://localhost:3000

## Contact

Sultanmakhmud Bazarbayev - sultanmakhmudbazarbayev@gmail.com

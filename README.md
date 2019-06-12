## Deployment instructions using docker
Install docker and docker compose 
run: docker-compose up

You can access the server from http://localhost:3000

## Local build
Setup a postgres database and add .env file with
DB_CONNECTION_URI=<db_connection_string>
PORT=<web_server_port>

and run the following commands 
npm install
npm start
## Deployment instructions using docker
Install docker and docker compose 
run: docker-compose up

You can access the server from http://localhost:3000

## Local build
Setup a postgres database and add .env file with <br />
DB_CONNECTION_URI=<db_connection_string> <br />
PORT=<web_server_port>

and run the following commands: <br />
npm install
<br />
npm start

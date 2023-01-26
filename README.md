# Followed Teams App

## Developed with:
- REACT
- EXPRESS
- MONGODB
- TAILWIND

This project folder contains the React client side and the Express Server side with MondoDB

## Enviroment SetUp
### `In the root folder npm run setup`
### `In the api folder npm install cors --save`
### `In the api folder npm install express-sanitizer --save`
### `In the client folder npm install @fortawesome/fontawesome-free --save`
### `In the client folder npm install spinners-react`
### `In the client folder npm install moment --save`

## Available Scripts

In the project directory, run the command:

### `docker-compose up --build`

Builds Docker images
Spins up the container that runs the local server (React web app)
Spins up the container that runs the Express server (running on Node.js)
Spins up the container that runs the MongoDB server

### `docker compose -f docker-compose-prod.yml up --build`
Builds docker container images for production build
Spins up the container that runs the Express server (running on Node.js) that handles the API requests as well as serves the client side's index.html
Spins up the container that runs the MongoDB server





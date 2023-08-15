# EasyMediaApp

This repository consists of a frontend application built with Angular and a backend service developed with Express.js. Additionally, it includes a MongoDB setup script to seed initial mock data. Both frontend and backend applications are containerized using Docker, and the whole stack can be started with Docker Compose.

## UI Inspiration

The design and user interface of the frontend application are inspired by [EasyMediaApp Figma](https://www.figma.com/file/govYW5Defpcm3iD2xe1Fsb/EasyMediaTech).

## Repository Structure

- `/front`: Contains the Angular frontend application. Dockerized for easy deployment.
- `/back`: Houses the Express.js backend service. Also Dockerized.
- `init-mongo.js`: A script that seeds the MongoDB with mock data to get you started quickly.
- `docker-compose.yml`: Defines the services, networks, and volumes to run the whole stack with Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the repository**:
   ```
   git clone https://github.com/Leonrdarc/EasyMediaApp.git
   cd EasyMediaApp
   ```

2. **Start the services**:
   ```
    docker-compose up -d
   ```

   This command will:

   - Build the Angular frontend and Express.js backend Docker images if they don't exist.
   - Start the services defined in `docker-compose.yml`, including the frontend, backend, and MongoDB.
   - Seed the MongoDB with initial mock data.

3. **Access the applications**:

   - Frontend: Open a browser and navigate to `http://localhost:4200`.
   - Backend: API endpoints can be accessed at `http://localhost:3000`.

4. **MongoDB cloud**:

   If you want to connect to a MongoDB instance hosted on MongoDB Cloud, modify the `docker-compose.yml` and update the environment variable for your backend service (here it is a test db):

   ```yaml
   environment:
      - MONGO_URI=mongodb+srv://admin:i3Kjz1KFM7v6duku@cluster0.gk0xx9g.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Mock Users**:

   The following users are seeded into the system for testing:

   - `luis@example.com`
   - `sofia@example.com`
   - `diego@example.com`

   You can log in with any of the above users using the password: `mockpass`.

6. **Stop and remove the services**:
   ```
   docker-compose down
   ```

## Run Apps Locally:

If you prefer to run the applications locally without Docker:

- **Frontend (Angular)**:

  Navigate to the front directory:

  ```
  cd front
  npm install
  npm run start
  ```

  The Angular app will be accessible at `http://localhost:4200`.

- **Backend (Express.js)**:

  Navigate to the back directory:

  ```
  cd back
  npm install
  npm run dev
  ```

  The Express.js server will start, and you can access the API endpoints at `http://localhost:3000`.

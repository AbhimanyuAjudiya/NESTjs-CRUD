# NESTjs CRUD Application

## Quick Start Guide

### Prerequisites

- Docker installed on your local machine.
- Node.js and npm installed.

### Setting up PostgreSQL Database using Docker

1. **Start PostgreSQL Database with Docker:**

   Run the following command to start a PostgreSQL database in a Docker container:

   ```bash
   docker run -p 5432:5432 -d \
       -e POSTGRES_PASSWORD=postgres \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_DB=nestjs_crud \
       -v pgdata:/var/lib/postgresql/data \
       postgres
    ```
2. **Get Container ID:**

    List the running Docker containers to get the container ID:

    ```bash
    docker container ls
    ```
3. **Access PostgreSQL Database:**

    Replace `<ContainerId>` with the actual container ID from the previous command and run:

    ```bash
    docker exec -it <ContainerId> psql -U postgres nestjs_crud
    ```

### Database Setup

Create the database and tables using the following SQL commands:
```sql
CREATE DATABASE nestjs_crud;
```
```sql
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```sql
CREATE TABLE WalletAddress (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES Users(id),
  address VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Setting up the NESTjs Application

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/AbhimanyuAjudiya/NESTjs-CRUD.git
    cd nestjs-crud
    ```
2. **Install Dependencies:**

    ```bash
    npm i
    ```

3. **Run the App**
    ```bash
    npm run start
    ```

## API Endpoints & Testing the API
 - Check all endpoints by going to http://localhost:3000/api
- All the logs will be stored in combined.log & error.log

### Additional Notes
- Ensure your Docker container is running while you are developing and testing your NESTjs application.
- For further customization, you can modify the configuration in app.module.ts and other files according to your needs.
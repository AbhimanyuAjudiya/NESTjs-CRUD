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
3. **Configure the Database:**

   Ensure your `app.module.ts` is configured to connect to your PostgreSQL database.

   ```typescript
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs_crud',
      entities: [User, WalletAddress],
      synchronize: true,
    }),
   ```
4. **Run the App**
    ```bash
    npm run start
    ```

## API Endpoints
### Users

Please Ref. [user.dto.ts](https://github.com/AbhimanyuAjudiya/NESTjs-CRUD/blob/main/src/users/dto/user.dto.ts) to create user and update user

- POST /users - Create a new user.
- GET /users - Get all users.
- GET /users/:id - Get a user by ID.
- PATCH /users/:id - Update a user by ID.
- DELETE /users/:id - Delete a user by ID.

### Wallet Addresses
Please Ref. [wallet-address.dto.ts](https://github.com/AbhimanyuAjudiya/NESTjs-CRUD/blob/main/src/wallet-address/dto/wallet-address.dto.ts) to create wallet and update wallet
- POST /wallet-addresses - Create a new wallet address.
- GET /wallet-addresses - Get all wallet addresses.
- GET /wallet-addresses/:id - Get a wallet address by ID.
- PATCH /wallet-addresses/:id - Update a wallet address by ID.
- DELETE /wallet-addresses/:id - Delete a wallet address by ID.

### Testing the API
You can use Postman or curl to test the API endpoints.

### Additional Notes
- Ensure your Docker container is running while you are developing and testing your NESTjs application.
- For further customization, you can modify the configuration in app.module.ts and other files according to your needs.
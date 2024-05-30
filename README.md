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

###
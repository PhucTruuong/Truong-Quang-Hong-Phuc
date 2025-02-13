# Problem 2.1 - GraphQL CRUD Server

## Project Description
This is a CRUD server built with ExpressJS, GraphQL using Apollo Server, TypeORM, and PostgreSQL. It allows clients to perform Create, Read, Update, and Delete operations using GraphQL queries and mutations.

---

## Setup & Execution

### Database Setup
1. Create a local PostgreSQL database.
2. Run the `aircraft_data.sql` script located in the root folder in your database development environment to populate initial data.

### Project Setup
1. Navigate to the project directory:
    ```sh
    cd src/problem2.1
    ```
2. Create an environment configuration file:
    ```sh
    touch .env
    ```
3. Insert the following content into the `.env` file (replace placeholders with actual values):
    ```env
    DB_HOST=localhost
    DB_USER=<your_db_username>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>
    DB_PORT=5432
    APP_PORT=8130
    DB_TYPE=postgres
    ```
4. Install dependencies:
    ```sh
    npm install
    ```
5. Start the server:
    ```sh
    npm run dev
    ```

---

## Requirements
- Node.js & npm installed
- PostgreSQL database
- TypeScript
- TypeORM
- ExpressJS
- Apollo Server
- GraphQL

---

## File Structure
```
src/
└── problem2.1/
    └── src/
        ├── server.ts
        ├── package.json
        ├── tsconfig.json
        ├── graphql/
            ├── resolvers/
            ├── schema/
            ├── services/
            ├── index.ts
        ├── utils/
        ├── database/
        ├── entities/
    ├── .env
```

---

## License
This project is licensed under the MIT License.
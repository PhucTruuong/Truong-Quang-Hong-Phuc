README for Problem 2.1 - GraphQL CRUD Server
Project Description
This is a CRUD server using ExpressJS, GraphQL with Apollo Server, TypeORM, and PostgreSQL.

Setup & Execution
Database Setup: 
    - Create a local PostgreSQL database.
    - Run the script aircraft_data.sql located in the root folder in your database development environment.

Project Setup: 
1. Navigate to the project directory:
    cd src/problem2.1
2. Create an environment file:
    touch .env
3. Insert the following content into the .env file:
    DB_HOST=localhost
    DB_USER=<your_db_username>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>
    DB_PORT=5432
    APP_PORT=8130
    DB_TYPE=postgres
4. Install dependencies:
    npm install
5. Start the server:
    npm run dev

Requirements
    - Node.js & npm installed
    - PostgreSQL database
    - TypeScript
    - TypeORM
    - ExpressJS
    - Apollo Server
    - GraphQL

File Structure
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

License
MIT License
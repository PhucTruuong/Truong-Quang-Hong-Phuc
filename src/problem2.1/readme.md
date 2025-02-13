<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README</title>
</head>
<body>
    <h1>CRUD Server with ExpressJS, GraphQL, Apollo Server, TypeORM, and PostgreSQL</h1>
    <p>This project is a CRUD server built using ExpressJS, GraphQL with Apollo Server, TypeORM, and a PostgreSQL database. I decided to make two CRUD server. In the next problem2.2 I created a 
    CRUD server using Restful API</p>
    
    <h2>Setup & Execution</h2>
    <p>Follow the steps below to set up and run the project:</p>
    
    <h3>Database Setup</h3>
    <ol>
        <li>Create a local PostgreSQL database.</li>
        <li>Run the script <code>aircraft_data.sql</code> located in the root folder in your database development environment.</li>
    </ol>
    
    <h3>Project Setup</h3>
    <ol>
        <li>Navigate to the project directory: <code>cd src/problem2.1</code></li>
        <li>Create an environment file: <code>touch .env</code></li>
        <li>Insert the following content into the <code>.env</code> file:</li>
    </ol>
    
    <pre>
        <code>
DB_HOST=localhost
DB_USER=&lt;your_db_username&gt;
DB_PASSWORD=&lt;your_db_password&gt;
DB_NAME=&lt;your_db_name&gt;
DB_PORT=5432
APP_PORT=8130
DB_TYPE=postgres
        </code>
    </pre>
    
    <h3>Installation & Execution</h3>
    <ol>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Start the server: <code>npm run dev</code></li>
    </ol>
    
    <h2>Requirements</h2>
    <ul>
        <li>Node.js & npm installed</li>
        <li>PostgreSQL database</li>
        <li>TypeScript</li>
        <li>TypeORM</li>
        <li>GraphQL & Apollo Server</li>
    </ul>
    
    <h2>File Structure</h2>
    <pre>
        <code>
src/
 ├── problem2.1/
 │   ├── src/
 │   │   ├── entities/
 │   │   ├── resolvers/
 │   │   ├── database/
 │   ├── .env
 │   ├── server.ts
 │   ├── package.json
 │   ├── tsconfig.json
        </code>
    </pre>
    
    <h2>License</h2>
    <p>MIT License</p>
</body>
</html>

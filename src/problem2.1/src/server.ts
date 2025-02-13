import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { typeDefs, resolvers } from '../src/graphql/index';
import { AppDataSource } from "./database/connect";

const graphqlServer = async () => {
    await AppDataSource.initialize();
    const app: Express = express();
    dotenv.config();
    const port = Number(process.env.APP_PORT);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (err) => {
            return {
                message: err.message,
                extensions: {
                    statusCode: err.extensions?.statusCode || 500,
                    timestamp: new Date().toISOString(),
                    error: err.extensions?.error || "Internal Server Error",
                },
            };
        },
    });

    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server),
    );

    app.listen({ port }, () => {
        console.log(`Server ready at http://localhost:${port}`);
        console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
    });
};

graphqlServer();
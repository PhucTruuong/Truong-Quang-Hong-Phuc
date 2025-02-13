import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { route } from './routes';
import { AppDataSource } from "./database/connect";
import errorHandler from './utils/errorHandler';

const expressServer = async () => {
    await AppDataSource.initialize();
    const app: Express = express();
    dotenv.config();
    const port = Number(process.env.APP_PORT);

    const swaggerOptions = {
        definition: { 
            openapi: '3.0.0', 
            info: {
                title: 'Aircrafts API',
                version: '1.0.0',
                description: 'CRUD API server for aircrafts management',
            },
        },
        apis: ['./src/routes/api/*.ts'], 
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    route(app);
    app.use(errorHandler);

    app.listen({ port }, () => {
        console.log(`Server start at http://localhost:${port}/api-docs`);
    });
};

expressServer();
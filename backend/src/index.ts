import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './infrastructure/database/db';

import { MongoUserRepository } from './infrastructure/repositories/MongoUserRepository';
import { ZtmService } from './infrastructure/services/ZtmService';
import { AuthUseCases } from './use-cases/AuthUseCases';
import { StopUseCases } from './use-cases/StopUseCases';
import { AuthController } from './interface/controllers/AuthController';
import { StopController } from './interface/controllers/StopController';

import { createAuthRouter } from './interface/routes/authRoutes';
import { createStopRouter } from './interface/routes/stopRoutes';

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const app = express();
app.use(cors());
app.use(express.json());

const userRepo = new MongoUserRepository();
const ztmService = new ZtmService();

const authUseCases = new AuthUseCases(userRepo);
const stopUseCases = new StopUseCases(userRepo, ztmService);

const authController = new AuthController(authUseCases);
const stopController = new StopController(stopUseCases);

app.use('/api', createAuthRouter(authController));
app.use('/api', createStopRouter(stopController));

const swaggerDocument = yaml.load('./src/interface/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
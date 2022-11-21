import express from 'express';
import authController from './auth.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';
// import path from 'path';



export const authRouter = express.Router();
authRouter.route('/register').post(sanitize(), authController.register);
authRouter.route('/login').post(sanitize(),validateBody(schemas.loginSchema), authController.login)




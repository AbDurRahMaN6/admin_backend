import express from 'express';
import categoryController from './category.controller';
import { sanitize } from '../../../middleware/sanitizer';

export const categoryRouter = express.Router();
categoryRouter.route('/create').post(sanitize(), categoryController.index);
categoryRouter.route('/main/list').get(sanitize(), categoryController.mainList);


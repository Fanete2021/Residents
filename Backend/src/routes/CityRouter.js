import express from 'express';
import { CityController } from '../controllers/index.js';
import { cityValidation } from '../validations/index.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const CityRouter = express.Router();

CityRouter.get('/', CityController.getAll);
CityRouter.post('/', cityValidation, handleValidationErrors, CityController.create);
CityRouter.delete('/:id', CityController.remove);
CityRouter.patch('/:id', cityValidation, handleValidationErrors, CityController.update);

export default CityRouter;
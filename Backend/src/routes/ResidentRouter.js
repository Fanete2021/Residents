import express from 'express';
import { ResidentController } from '../controllers/index.js';
import { residentValidation } from '../validations/index.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const ResidentRouter = express.Router();

ResidentRouter.get('/', ResidentController.getAll);
ResidentRouter.post('/', residentValidation, handleValidationErrors, ResidentController.create);
ResidentRouter.delete('/:id', ResidentController.remove);
ResidentRouter.patch('/:id', residentValidation, handleValidationErrors, ResidentController.update);

export default ResidentRouter;
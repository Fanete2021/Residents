import { body } from 'express-validator';

export const cityValidation = [
  body('name', 'Введите название (от 3 до 10 симолов)').isLength({ min: 3, max: 10 }).isString(),
  body('data', 'Введите население (от 2 до 10 симолов)').isLength({ min: 2, max: 10 }).isString(),
];

export default cityValidation;
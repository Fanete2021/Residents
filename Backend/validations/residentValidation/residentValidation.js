import { body } from 'express-validator';

export const residentValidation = [
  body('name', 'Введите имя').isLength({ min: 3 }).isString(),
  body('groups', 'Группа должна быть массивом и содержать минимум 1 элемент').isArray().isLength({ min: 1 })
];

export default residentValidation;
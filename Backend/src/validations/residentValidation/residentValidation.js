import { body } from 'express-validator';

export const residentValidation = [
  body('name', 'Введите имя (от 3 до 10 символов)').isLength({ min: 3 }).isString(),
  body('groups', 'Группа должна содержать минимум 1 элемент').isArray().isLength({ min: 1 })
];

export default residentValidation;
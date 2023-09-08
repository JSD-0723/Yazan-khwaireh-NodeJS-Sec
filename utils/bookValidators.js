import { body } from 'express-validator';

const createBookValidator = [
  body('name', 'Name is required')
    .exists()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isString()
    .trim()
];

export default createBookValidator;

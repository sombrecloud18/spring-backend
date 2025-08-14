import { body } from 'express-validator';

export const validateSignup = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must contain at least 3 symbols')
    .trim()
    .escape(),
  
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must contain at least 4 symbols')
    .matches(/\d/)
    .withMessage('Password must contain at least 1 number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least 1 letter'),
    
  body('repeatPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
    
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('First name must contain at least 3 symbols')
    .trim()
    .escape(),
    
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must contain at least 3 symbols')
    .trim()
    .escape(),
    
  body('age')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive number')
];
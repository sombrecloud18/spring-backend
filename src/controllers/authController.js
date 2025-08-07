import * as authService from '../services/authService.js';
import { body, validationResult } from 'express-validator';

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

export const signup = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorMap = validationErrors.array().reduce((acc, err) => {
      acc[err.param] = err.msg;
      return acc;
    }, {});
    return res.status(400).json({ success: false, errors: errorMap });
  }

  try {
    const { username, password, firstName, lastName, age } = req.body;
    const result = await authService.registerUser({
      username,
      password,
      firstName,
      lastName,
      age
    });

    if (result.success) {
      res.status(201).json({
        success: true,
        user: result.user,
        accessToken: result.accessToken
      });
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.validateCredentials(username, password);
    
    if (result.success) {
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });
      
      res.json({
        success: true,
        accessToken: result.accessToken,
        user: result.user
      });
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
}

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token missing' });
    }

    const result = authService.refreshAccessToken(refreshToken);
    
    if (result.success) {
      res.json({
        success: true,
        accessToken: result.accessToken
      });
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ success: false, message: 'Server error during token refresh' });
  }
}

export const logout = (res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
}
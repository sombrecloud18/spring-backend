import express from 'express';
import * as authService from '../services/auth-service.js';
import { validateSignup } from '../validators.js';
import { asyncMiddleware, validateRequest } from '../error-middleware.js';

const router = express.Router();

router.post('/login', asyncMiddleware(async (req, res) => {
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
}));

router.post('/signup', 
  validateSignup,
  validateRequest,
  asyncMiddleware(async (req, res) => {
    const result = await authService.registerUser(req.body);
    result.success 
      ? res.status(201).json(result)
      : res.status(400).json(result);
  })
);

router.post('/refresh-token', asyncMiddleware(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ 
      success: false, 
      message: 'Refresh token missing' 
    });
  }
  const result = await authService.refreshAccessToken(refreshToken);
  res.status(result.success ? 200 : 401).json(result);
}));

router.post('/logout', asyncMiddleware((req, res) => {
  res.clearCookie('refreshToken');
  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
}));

export { router as authRouter };
import * as authService from '../services/auth-service.js';

export const signup = async (req, res) => {
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
};

export const login = async (req, res) => {
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
}

export const refreshToken = async (req, res) => {
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
};

export const logout = (res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
}
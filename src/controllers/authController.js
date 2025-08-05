import * as authService from '../services/authService.js';

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

    const result = await authService.refreshAccessToken(refreshToken);
    
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

export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
}
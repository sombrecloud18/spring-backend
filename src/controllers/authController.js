import * as authService from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.validateCredentials(username, password);
    result.success ? res.json(result) : res.status(401).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
}
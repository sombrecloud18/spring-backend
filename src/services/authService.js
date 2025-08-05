import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export const validateCredentials = async (username, password) => {
  try {
    const user = await authRepository.findUser(username, password);
    
    if (!user) {
      return {
        success: false,
        message: 'Incorrect login or password'
      };
    }

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    return {
      success: true,
      message: 'Welcome!',
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username }
    };
  } catch (error) {
    console.error('Error validating credentials:', error);
    return {
      success: false,
      message: 'Authentication error'
    };
  }
};

export const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    return {
      success: true,
      accessToken: newAccessToken
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return {
      success: false,
      message: 'Invalid refresh token'
    };
  }
};
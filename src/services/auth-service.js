import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as authRepository from '../repositories/auth-repository.js';
import { ValidateError, AuthError } from '../error-middleware.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '1d';

export const validateCredentials = async (username, password) => {
    const user = await authRepository.findUserByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (!user || !isValid) {
      throw new AuthError('Incorrect login or password', {showDuration: 5000});
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
};

export const refreshAccessToken = (refreshToken) => {
  if (!refreshToken) {
    throw new AuthError('Error refreshing token:');
  }
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
};

export const registerUser = async (userData) => {
    const { username, password, repeatPassword, firstName, lastName, age } = userData;
    const hash = await bcrypt.hash(password, 10);
    const existingUser = await authRepository.findUserByUsername(username);
    if (existingUser) {
      throw new ValidateError('Username already exists', { field: 'username' });
    }
    const user = await authRepository.createUser({
      username,
      password: hash,
      firstName,
      lastName,
      age
    });

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
      accessToken,
      refreshToken,
      user: { 
        id: user.id, 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
      }
    };
};
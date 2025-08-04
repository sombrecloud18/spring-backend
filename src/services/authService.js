import * as authRepository from '../repositories/authRepository.js';

export const validateCredentials = async (username, password) => {
  try {
    const isValid = await authRepository.findUser(username, password);
    return {
      success: isValid,
      message: isValid ? 'Welcome!' : 'Incorrect login or password'
    };
  } catch (error) {
    console.error('Error validating credentials:', error);
    return {
      success: false,
      message: 'Authentication error'
    };
  }
};
import { validationResult } from 'express-validator';

export const asyncMiddleware = (fn) => 
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMap = errors.array().reduce((acc, err) => {
      const fieldName = err.path;
      if (fieldName) {
        acc[fieldName] = err.msg;
      }
      return acc;
    }, {});
    
    return res.status(400).json({ 
      success: false, 
      errors: errorMap 
    });
  }
  next();
};

class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.success = false;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidateError extends AppError {
  constructor(message = 'Validation failed', details = null) {
    super(message, 400, details);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Authentication failed', details = null) {
    super(message, 401, details);
  }
}

export class ProjectsError extends AppError {
  constructor(message = 'Projects operation failed', details = null) {
    super(message, 500, details);
  }
}

export const globalErrorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
    ...(err.details && { details: err.details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(status).json(response);
};
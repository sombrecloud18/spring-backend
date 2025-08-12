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

export const globalErrorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';
import { jsonResponse } from '../utils';

/**
 * Validation middleware factory
 * @param schema - Yup validation schema
 * @param property - Request property to validate ('body', 'params', 'query')
 */
export const validate = (
  schema: AnyObjectSchema,
  property: 'body' | 'params' | 'query' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and transform the data
      const validated = await schema.validate(req[property], {
        abortEarly: false, // Return all errors at once
        stripUnknown: true, // Remove unknown fields
      });

      // Replace the property with validated and transformed data
      req[property] = validated;
      next();
    } catch (error: any) {
      // Format Yup validation errors
      if (error.name === 'ValidationError') {
        const errors: Record<string, string> = {};
        
        error.inner.forEach((err: any) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });

        return jsonResponse(
          res,
          400,
          false,
          { validationErrors: errors },
          'Validation failed'
        );
      }

      // Handle unexpected errors
      return jsonResponse(
        res,
        500,
        false,
        undefined,
        'Validation error occurred'
      );
    }
  };
};


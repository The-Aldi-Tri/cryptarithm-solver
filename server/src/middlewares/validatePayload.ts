import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';

const validatePayload = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult: ValidationResult = schema.validate(req.body, {
      abortEarly: process.env.NODE_ENV === 'production', // if true: Report all errors (not stop after first error)
      stripUnknown: true, // Strip unknown properties)
    });

    if (validationResult.error) {
      return res
        .status(422)
        .json({ error: validationResult.error.details[0].message });
    }

    next();
  };
};

export default validatePayload;

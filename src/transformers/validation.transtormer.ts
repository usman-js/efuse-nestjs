import { ValidationError } from 'class-validator';

export const ValidationFormatter = (ValidationErrors) => {
  const errors: any[] = [];
  ValidationErrors.forEach((error) => {
    errors.push({
      [error.property]: Object.values(error.constraints)[0],
    });
  });
  return { errors, statusCode: 422, message: 'Validation Failed' };
};

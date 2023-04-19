import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SchemaOf, ValidationError } from 'yup';

type TValidation = (scheme: SchemaOf<any>) => RequestHandler;

// função de validação que cria um middleware generico da forma que quiser

export const validation: TValidation = (scheme) => async (req, res, next) => {
  console.log('teste');

  try {
    await scheme.validate(req.query, {
      abortEarly: false,
    });
    return next();
  } catch (error) {
    const yupError = error as ValidationError;
    const errors: Record<string, string> = {};
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
};

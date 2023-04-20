import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError, Maybe, AnyObject } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetSchemas = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type TGetAllSchemas = (getSchema: TGetSchemas) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

// função de validação que cria um middleware generico da forma que quiser

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};
    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};
        yupError.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });
        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };

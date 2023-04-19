import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';

interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

interface IFilter {
  filter?: string;
}

const queryValidation: yup.SchemaOf<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const createValidation = validation(queryValidation);
export const createBodyValidator = validation(bodyValidation);

export const create: RequestHandler = async (
  req: Request<{}, {}, ICidade>,
  res: Response
) => {
  console.log(req.body);

  return res.send('Create');
};

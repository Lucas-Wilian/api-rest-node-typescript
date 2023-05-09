import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuario';
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      senha: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signIn: RequestHandler = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  const usuario = await UsuariosProvider.getByEmail(email);

  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    usuario.senha
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: usuario.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o tken de acesso',
        },
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken });
  }
};

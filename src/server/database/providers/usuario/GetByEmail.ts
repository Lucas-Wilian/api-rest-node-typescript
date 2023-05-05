import { ETableNames } from '../../EtableName';
import { IUsuario } from '../../models';
import { Knex } from '../../knex';

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select('*')
      .where('email', '=', email)
      .first();
    if (result) return result;
    return new Error('Regsitro nao encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Regsitro nao encontrado');
  }
};

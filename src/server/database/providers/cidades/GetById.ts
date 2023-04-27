import { EtableNames } from '../../EtableName';
import { ICidade } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(EtableNames.cidade)
      .select('*')
      .where('id', '=', id)
      .first();
    if (result) return result;
    return new Error('Erro ao consultar registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar registro');
  }
};

import { EtableNames } from '../../EtableName';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(EtableNames.pessoa)
      .select('*')
      .where('id', '=', id)
      .first();
    if (result) return result;
    return new Error('Regsitro nao encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Regsitro nao encontrado');
  }
};

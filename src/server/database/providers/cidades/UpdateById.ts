import { ETableNames } from '../../EtableName';
import { ICidade } from '../../models';
import { Knex } from '../../knex';

export const updateId = async (
  id: number,
  cidade: Omit<ICidade, 'id'>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where('id', '=', id);
    if (result > 0) return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};

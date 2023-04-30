import { EtableNames } from '../../EtableName';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const create = async (
  pessoa: Omit<IPessoa, 'id'>
): Promise<number | Error> => {
  const [{ count }] = await Knex(EtableNames.pessoa)
    .where('id', '=', pessoa.cidadeId)
    .count<[{ count: number }]>('* as count');

  if (count === 0) {
    return new Error('A cidade usada no cadastro não foi encontrada');
  }

  try {
    const [result] = await Knex(EtableNames.pessoa)
      .insert(pessoa)
      .returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};

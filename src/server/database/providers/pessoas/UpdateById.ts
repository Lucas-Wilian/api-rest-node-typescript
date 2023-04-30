import { EtableNames } from '../../EtableName';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const updateId = async (
  id: number,
  pessoa: Omit<IPessoa, 'id'>
): Promise<void | Error> => {
  const [{ count }] = await Knex(EtableNames.pessoa)
    .where('id', '=', pessoa.cidadeId)
    .count<[{ count: number }]>('* as count');

  if (count === 0) {
    return new Error('A cidade usada no cadastro não foi encontrada');
  }

  try {
    const result = await Knex(EtableNames.pessoa)
      .update(pessoa)
      .where('id', '=', id);
    if (result > 0) return;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};

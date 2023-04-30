import { EtableNames } from '../../EtableName';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(EtableNames.pessoa)
      .where('nomeCompleto', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');
    if (Number.isInteger(Number(count))) return Number(count);
    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (erros) {
    console.log(erros);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};

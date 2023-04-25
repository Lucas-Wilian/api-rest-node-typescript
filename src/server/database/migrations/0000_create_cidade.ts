import { Knex } from 'knex';
import { EtableNames } from '../EtableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(EtableNames.cidade, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();
      table.comment('Tabela usada para o armazenamento de cidade do Sistema');
    })
    .then(() => {
      console.log(`# Created table ${EtableNames.cidade}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(EtableNames.cidade).then(() => {
    console.log(`# Dropped table ${EtableNames.cidade}`);
  });
}

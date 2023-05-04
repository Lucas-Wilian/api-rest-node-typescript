import { Knex } from 'knex';
import { EtableNames } from '../EtableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(EtableNames.usuario, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable().checkLength('>', 3);
      table.string('email').index().notNullable().checkLength('>', 6);
      table.string('senha').unique().notNullable().checkLength('>', 5);

      table.comment('Tabela usada para o armazenar o usuarios do Sistema');
    })
    .then(() => {
      console.log(`# Created table ${EtableNames.usuario}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(EtableNames.usuario).then(() => {
    console.log(`# Dropped table ${EtableNames.usuario}`);
  });
}

import { Knex } from 'knex';
import { ETableNames } from '../EtableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable().checkLength('>=', 3);
      table.string('email').index().notNullable().checkLength('>=', 5);
      table.string('senha').unique().notNullable().checkLength('>=', 6);

      table.comment('Tabela usada para o armazenar o usuarios do Sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`# Dropped table ${ETableNames.usuario}`);
  });
}

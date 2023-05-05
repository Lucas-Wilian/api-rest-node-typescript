import { Knex } from 'knex';
import { ETableNames } from '../EtableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para o armazenamento de pessoa do Sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ETableNames.pessoa).then(() => {
    console.log(`# Dropped table ${ETableNames.pessoa}`);
  });
}

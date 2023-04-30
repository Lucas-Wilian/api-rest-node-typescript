import { Knex } from 'knex';
import { EtableNames } from '../EtableName';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(EtableNames.pessoa, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(EtableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para o armazenamento de pessoa do Sistema');
    })
    .then(() => {
      console.log(`# Created table ${EtableNames.pessoa}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(EtableNames.pessoa).then(() => {
    console.log(`# Dropped table ${EtableNames.pessoa}`);
  });
}

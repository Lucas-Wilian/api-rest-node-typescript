import { ICidade } from '../../models';
declare module 'knex/types/tables' {
  interface Tables {
    cidade: ICidade;
    // pesspa: IPessoa
    // usuario: IUsuario
  }
}

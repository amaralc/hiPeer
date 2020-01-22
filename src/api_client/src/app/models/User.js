/* --------------------------------- IMPORTS ---------------------------------*/
import Sequelize, { Model } from 'sequelize';

/* --------------------------------- CONTENT ---------------------------------*/
/*
 ** Cria classe User extendendo os metodos da classe Model, da dependencia
 ** 'sequelize'
 */
class User extends Model {
  /*
   ** Metodo estatico que sera chamado automaticamente pelo sequelize
   */
  static init(sequelize) {
    /*
     ** Chama metodo init da classe superior (Model) enviando colunas da base
     ** de dados e envia somente o que o usuario vai fornecer como input.
     ** (chave primaria, etc, nao sao necessarias)
     */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        /*
         ** Argumento que sera enviado pelo loader de models
         */
        sequelize,
      }
    );
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default User;

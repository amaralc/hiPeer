/* --------------------------------- IMPORTS ---------------------------------*/
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/* --------------------------------- CONTENT ---------------------------------*/
/**
 * Cria classe User extendendo os metodos da classe Model, da dependencia
 * 'sequelize'
 */
class User extends Model {
  /**
   * Metodo estatico que sera chamado automaticamente pelo sequelize
   */
  static init(sequelize) {
    /**
     * Chama metodo init da classe superior (Model) enviando colunas da base
     * de dados e envia somente o que o usuario vai fornecer como input.
     * (chave primaria, etc, nao sao necessarias)
     */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Campo sem correspondencia no database
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

    /**
     * Hooks: Funcionalidade do sequelize -> trecho de codigo executados de
     * forma automatica baseado em acoes que acontecem no nosso model.
     *
     * Hook 'before save': executa trecho de codigo antes de objeto ser salvo
     * no banco de dados (criado ou editado).
     */
    this.addHook('beforeSave', async user => {
      /** Se houver password na requisicao */
      if (user.password) {
        /**
         * Aguarda e define password_hash como 8 rouds de criptografia da string
         * enviada.
         */
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    /** Retorna model que acaba de ser inicializado */
    return this;
  }

  /** Recebe senha enviada pelo cliente */
  checkPassword(password) {
    /**
     * Retorna comparacao entre hash da senha enviada com hash salvo no
     * banco de dados.
     *
     * Retorna 'true' caso senhas sejam iguais.
     */
    return bcrypt.compare(password, this.password_hash);
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default User;

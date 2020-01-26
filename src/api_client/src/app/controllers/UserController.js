/* --------------------------------- IMPORTS ---------------------------------*/
import User from '../models/User';

/* --------------------------------- CONTENT ---------------------------------*/
class UserController {
  /**
   * Metodo store com mesma face de um middleware no node.
   * Recebe dados do usuario e cria novo registro dentro da base de dados.
   */
  async store(req, res) {
    /** Verifica se usuario do corpo da requisicao ja existe */
    const userExists = await User.findOne({ where: { email: req.body.email } });

    /** Se usuario ja existir, retorna erro */
    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    /**
     * Cria usuario na base de dados usando resposta asincrona e retorna apenas
     * dados uteis.
     */
    const { id, name, email, provider } = await User.create(req.body);

    /** Retorna json apenas com dados uteis ao frontend */
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  /** Metodo de alteracao dos dados do usuario */
  async update(req, res) {
    /** Busca email e oldPassword de dentro do req.body */
    const { email, oldPassword, password } = req.body;

    /** Get current user information */
    const user = await User.findByPk(req.userId);

    /** If user is changing the email adress */
    if (email !== user.email) {
      /** Verify if new email already exists in the database */
      const userExists = await User.findOne({
        where: { email },
      });

      /** If email is already taken return error */
      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }

    /** If user has informed new password without informing old password */
    if (password && !oldPassword) {
      /** ...return arror 401 and request user to inform old password */
      res.status(401).json({ error: 'Inform old password' });
    }

    /**
     * If user has informed old password and (&&) it does not match with its old
     * password...
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      /**
       *  ...return error 401
       */
      res.status(401).json({ error: 'Password does not match' });
    }

    /** If all requirements were met then updates user informaiton */
    const { id, name, provider } = await user.update(req.body);

    /** Retorna json apenas com dados uteis ao frontend */
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new UserController();

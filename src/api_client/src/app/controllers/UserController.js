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
      return res.json({ error: 'User already exists!' });
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
    /** Pega id do usuario inserido na requisicao atravez do middleware de autenticacao */
    console.log(req.userId);

    /** Retorna json */
    return res.json({ ok: true });
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new UserController();

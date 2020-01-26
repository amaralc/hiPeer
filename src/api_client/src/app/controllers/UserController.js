/* --------------------------------- IMPORTS ---------------------------------*/
/** Importa tudo de yup como Yup (dependencia nao tem export default) */
import * as Yup from 'yup';
import User from '../models/User';

/* --------------------------------- CONTENT ---------------------------------*/
class UserController {
  /**
   * Metodo store com mesma face de um middleware no node.
   * Recebe dados do usuario e cria novo registro dentro da base de dados.
   */
  async store(req, res) {
    /** Define schema to validate req.body prior to 'store()' data */
    const schema = Yup.object().shape({
      /** Attribute 'name' is a required string */
      name: Yup.string().required(),
      /** Attribute 'email' is a required string with email format */
      email: Yup.string()
        .email()
        .required(),
      /** Attribute 'password' is a required string with at least 6 digits */
      password: Yup.string()
        .required()
        .min(6),
    });

    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }

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
    /** Define schema to validate req.body prior to 'update()' method */
    const schema = Yup.object().shape({
      /** Attribute 'name' is a string */
      name: Yup.string(),
      /** Attribute 'email' is a string with email format */
      email: Yup.string().email(),
      /** Attribute 'password' is a string with at least 6 digits */
      password: Yup.string().min(6),
      /** Attribute 'oldPassword' is a string with at least 6 digits */
      oldPassword: Yup.string()
        .min(6)
        /**
         * ... and when password is sent, this field (oldPassword) is required.
         * In the video the instructor does the opposite (when oldPassword is
         * sent, 'password' is required) but it result in a bug (user can change)
         * its password without informing the oldPassword. So I decided to do it
         * differently here. */
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      /** Attribute 'checkPassword' is a string */
      confirmPassword: Yup.string()
        /**
         * ... and when password is present, this field (confirmPassword) must
         * be equal to 'password'
         */
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }

    /** Busca email e oldPassword de dentro do req.body */
    const { email, oldPassword } = req.body;

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

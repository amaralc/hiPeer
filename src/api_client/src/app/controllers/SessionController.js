/* --------------------------------- IMPORTS ---------------------------------*/
import jwt from 'jsonwebtoken';
/** Importa tudo de yup como Yup (dependencia nao tem export default) */
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

/* --------------------------------- CONTENT ---------------------------------*/
class SessionController {
  async store(req, res) {
    /** Define schema to validate req.body prior to 'store()' data */
    const schema = Yup.object().shape({
      /** Attribute 'email' is a required string with email format */
      email: Yup.string()
        .email()
        .required(),
      /** Attribute 'password' is a required string */
      password: Yup.string().required(),
    });

    /** If 'req.body' do not attend to the schema requirements (is not valid) */
    if (!(await schema.isValid(req.body))) {
      /** Return error status 400 with message 'Validation has failed' */
      return res.status(400).json({ error: 'Validation has failed' });
    }
    /** Salva email e senha recebidos no corpo da requisicao */
    const { email, password } = req.body;

    /** Encontra usuario que tem campo email = variavel email (short sintax) */
    const user = await User.findOne({ where: { email } });

    /** Se usuario nao existe retorna erro 401 (nao autorizado) */
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    /** Se hash da senha nao bate com hash salvo no database */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    /** Se email foi encontrado e senha estiver correta salva 'id' e 'name' */
    const { id, name } = user;

    return res.json({
      /** Retorna dados do usuario para o cliente */
      user: { id, name, email },
      /** Retorna jwt token */
      token: jwt.sign(
        /** Envia payload */
        {
          id,
        },
        /** Envia string secreta aleatoria (ex.: gerada pelo md5online.org) */
        authConfig.secret,
        /** Envia data de expiracao obrigatoria do token (padrao: 7 dias) */
        { expiresIn: authConfig.expiresIn }
      ),
    });
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new SessionController();

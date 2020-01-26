/* --------------------------------- IMPORTS ---------------------------------*/
import jwt from 'jsonwebtoken';
/**
 * Importa 'promisify' de 'util', biblioteca padrao que vem com node.
 * O 'promisify' pega uma funcao de callback e transforma em uma funcao onde se
 * pode utilizar o async await.
 */
import { promisify } from 'util';
import authConfig from '../../config/auth';

/* --------------------------------- CONTENT ---------------------------------*/

/* --------------------------------- EXPORTS ---------------------------------*/
/** Exporta middleware (funcao) usando req, res e next */
export default async (req, res, next) => {
  /** Get authorization header from requisition header */
  const authHeader = req.headers.authorization;
  /** Se header nao estiver presente na requisicao */
  if (!authHeader) {
    /** Retorna erro */
    res.status(401).json({ error: 'Token not provided' });
  }

  /**
   * Caso contrario, divide a authHeader por espacos, desestrutura, descarta
   * posicao 0 do array e pega apenas token (posicao 1 do array).
   */
  const [, token] = authHeader.split(' ');

  /** Define try catch pois requisicao pode retornar erro */
  try {
    /**
     * Decifra token utilizando metodo jwt.verify
     * Obs.: jwt.verify usa callback e por isso usamos 'promisify' para
     * transformar em funcao tipo async await */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    /** Inclui ID do usuario dentro do nosso req */
    req.userId = decoded.id;

    /** Se middleware nao retornar erro, requisicao chama o 'next' controller */
    return next();

    /** Caso jwt.verify retorne erro */
  } catch (err) {
    /** Informa que token nao e valido */
    return res.json({ error: 'Invalid token' });
  }
};

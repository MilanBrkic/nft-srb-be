import jwt from 'jsonwebtoken';
import Constants from '../constants/Constants';
export default class JWTService {
  public static generateJWT(address: string) {
    return jwt.sign({ address }, Constants.JWT_SECRET_KEY, { expiresIn: '3h' });
  }

  public static verify(bearer: string) {
    return jwt.verify(bearer, Constants.JWT_SECRET_KEY);
  }
}

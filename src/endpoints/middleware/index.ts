import { NextFunction, Request, Response } from 'express';
import MulterRequest from '../../multer/MulterRequest';
import JWTService from '../../services/JWTService';

export default function decodeBearerToken(req: Request | MulterRequest, res: Response, next: NextFunction) {
  if (req.originalUrl === '/auth') {
    return next();
  }

  const auth = req.headers.authorization;

  if (!auth || auth.indexOf('Bearer') === -1) {
    return res.status(401).send('No auth');
  }

  const bearer = auth.split(' ')[1];
  let jwtToken: any;

  try {
    jwtToken = JWTService.verify(bearer);
  } catch (error) {
    console.log(error);
    return res.status(401).send('Invalid token');
  }

  req.body.address = jwtToken.address;
  next();
}

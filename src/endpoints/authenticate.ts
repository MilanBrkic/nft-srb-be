import { Request, Response } from 'express';
import User from '../domain/User';
import userModel from '../db/model/UserModel';
import JWTService from '../services/JWTService';

export default async function authenticate(req: Request, res: Response) {
  const address = req.body.accounts[0];
  let accessId: string;
  let user: User;

  if (!address) {
    return res.status(404).send('No account sent');
  }

  try {
    accessId = JWTService.generateJWT(address);
  } catch (error) {
    console.error('JWTService.generateJWT failed');
    return res.status(500).send('Internal server error');
  }

  try {
    user = await userModel.findByAddress(address);
    if (user) {
      console.log(`User logged in with address: ${user.address}`);
      res.status(200).send({ new_user: false, address: user.address, accessId });
    } else {
      user = await userModel.insert(address);
      console.log(`User created with address: ${user.address}`);
      res.status(201).send({ new_user: true, address: user.address, accessId });
    }
  } catch (error) {
    console.log(`signIn() function | Reason ${error?.stack}`);
    res.status(500).end();
  }
}

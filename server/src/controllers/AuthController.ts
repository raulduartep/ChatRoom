import { Response, Request } from 'express';
import AccessToken from '@utils/AccessToken';
import { getRepository } from 'typeorm';

import User from '@models/UserModel';

class AuthController {
  static async login(request: Request, response: Response) {
    const { username } = request.body;

    if (!username) {
      return response.status(401).json({
        error: 'Username not informed',
      });
    }

    try {
      const userRepository = getRepository(User);

      const findUser = await userRepository.findOne({
        username,
      });

      if (findUser) {
        return response.status(401).json({
          error: 'Username already exist',
        });
      }

      const token = AccessToken.create({ username });

      return response.status(200).json({
        token,
      });
    } catch (error) {
      console.log(error);

      return response.status(400).json({
        error: 'Unexpected error',
      });
    }
  }
}

export default AuthController;

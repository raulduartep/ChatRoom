import { Response, Request } from 'express';
import AccessToken from '@utils/AccessToken';
import { getRepository } from 'typeorm';

import User from '@models/UserModel';

class AuthController {
  static async login(request: Request, response: Response) {
    const { username } = request.params;

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

      const user = userRepository.create({
        username,
      });

      userRepository.save(user);

      const token = AccessToken.create(String(user.id));

      request.socketIO.

      return response.status(200).json({
        token,
      });
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error',
      });
    }
  }
}

export default AuthController;

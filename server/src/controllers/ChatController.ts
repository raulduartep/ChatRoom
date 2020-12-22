import { Response, Request } from 'express';
import { getRepository } from 'typeorm';

import Message from '@models/MessageModel';
import User from '@models/UserModel';
import MessageView from '@views/MessageView';
import UserView from '@views/UserView';

class ChatController {
  static async index(request: Request, response: Response) {
    try {
      const messageRepository = getRepository(Message);
      const userRepository = getRepository(User);

      const messages = await messageRepository.find();
      const users = await userRepository.find();

      return response.status(200).json({
        messages: MessageView.renderMany(messages),
        users: UserView.renderMany(users),
      });
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error',
      });
    }
  }
}

export default ChatController;

import SocketIO from 'socket.io';
import http from 'http';
import { getRepository } from 'typeorm';
import User from '@models/UserModel';
import Message from '@models/MessageModel';
import AccessToken from '@utils/AccessToken';
import UserView from '@views/UserView';
import MessageView from '@views/MessageView';

interface ExtendedSocket extends SocketIO.Socket {
  username: string
}

class SocketController {
  private readonly io: SocketIO.Server

  constructor(server: http.Server) {
    this.io = new SocketIO.Server(server, {
      cors: {
        origin: '*',
      },
    });
  }

  public run() {
    this.authentication();
    this.connectedSocket();
  }

  private authentication() {
    this.io.use((socket: ExtendedSocket, next) => {
      const { token } = socket.handshake.query as any;

      if (!token) {
        next(new Error('Token not informed'));
      }

      try {
        const { username } = AccessToken.validate(token);
        socket.username = String(username);

        next();
      } catch (error) {
        next(error);
      }
    });
  }

  private connectedSocket() {
    this.io.on('connection', async (socket: ExtendedSocket) => {
      await this.handleNewSocket(socket);
      this.handleDisconnectedSocket(socket);
      this.handleSendMessage(socket);
    });
  }

  private handleSendMessage(socket: ExtendedSocket) {
    socket.on('send_message', async (messageText: string) => {
      try {
        const userRepository = getRepository(User);
        const messageRepository = getRepository(Message);

        const user = await userRepository.findOne({
          where: {
            username: socket.username,
          },
        });

        const message = messageRepository.create({
          message: messageText,
          owner: user,
          signature: user.username,
        });

        await messageRepository.save(message);

        this.io.sockets.emit('new_message', MessageView.render(message));
      } catch (error) {
        console.log('ww', error);
      }
    });
  }

  private handleDisconnectedSocket(socket: ExtendedSocket) {
    socket.on('disconnect', async () => {
      try {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
          where: {
            username: socket.username,
          },
        });

        await userRepository.delete(user);

        this.io.sockets.emit('user_disconnect', UserView.render(user));
      } catch (error) {
        console.log('bb', error);
      }
    });
  }

  private async handleNewSocket(socket: ExtendedSocket) {
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: {
          username: socket.username,
        },
      });

      if (!user) {
        const newUser = userRepository.create({
          username: socket.username,
        });

        userRepository.save(newUser);

        this.io.sockets.emit('new_user', UserView.render(newUser));
      }
    } catch (error) {
      console.log('aa', error);
    }
  }
}

export default SocketController;

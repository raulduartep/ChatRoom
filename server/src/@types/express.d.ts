import { Server } from 'socket.io';

declare global {
  module Express {
    export interface Request {
      socketIO: Server;
    }
  }
}

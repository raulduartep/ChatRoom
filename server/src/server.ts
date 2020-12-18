import express from 'express';
import cors from 'cors';
import SocketIo from 'socket.io';
import http from 'http';

import routes from './routes';

// interface ConnectedUser {
//   name: string;
//   socketId: string;
// }

const app = express();
const server = http.createServer(app);
const io = new SocketIo.Server(server, {
  cors: {
    origin: '*',
  },
});

// let connectedUsers: ConnectedUser[] = [];

// io.on('connection', (socket: SocketIo.Socket) => {
//   const { username } = socket.handshake.query as any;

//   const user: ConnectedUser = {
//     name: username,
//     socketId: socket.id,
//   };

//   connectedUsers.push(user);

//   socket.emit('setup', connectedUsers.map((connectedUser) => connectedUser.name));

//   socket.broadcast.emit('new_user', user.name);

//   socket.on('disconnect', () => {
//     connectedUsers = connectedUsers.filter((connectedUser) => connectedUser.socketId !== socket.id);

//     io.sockets.emit('user_disconnect', user.name);
//   });

//   socket.on('send_message', (message: { author: string, text: string }) => {
//     io.sockets.emit('new_message', message);
//   });
// });

app.use((request, response, next) => {
  request.socketIO = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

import express from 'express';
import cors from 'cors';
import http from 'http';

import './database/connection';

import SocketController from '@controllers/SocketController';
import routes from './routes';

const app = express();
const server = http.createServer(app);
new SocketController(server).run();

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

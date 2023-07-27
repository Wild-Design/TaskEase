import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors({ origin: '*' }));

server.get('/', (_: Request, res: Response) => {
  res.status(200).send('Bienvenido a TaskEase :D');
});

server.use(routes);

export default server;

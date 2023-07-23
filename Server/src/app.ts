import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors({ origin: '*' }));

server.get('/', (req: Request, res: Response) => {
  res.status(200).send('Ta funcionando el server :D');
});

export default server;

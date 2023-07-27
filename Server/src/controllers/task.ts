import { Request, Response } from 'express';

export const getTask = (_: Request, res: Response) => {
  res.status(200).send('getTask');
};

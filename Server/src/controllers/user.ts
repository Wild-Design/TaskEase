import { Request, Response } from 'express';
import { User, List, Task } from '../db/db.js';
import { IRegister } from '../interfaces/index.js';
import { authenticated } from '../utils/index.js';

export const getUser = async (_: Request, res: Response) => {
  try {
    const getUsers = await User.findAll();
    res.status(200).send(getUsers);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { user_name, password, email }: IRegister = req.body;
  try {
    if (!user_name || !password || !email) {
      return res
        .status(404)
        .send('¡user_name, email and password are required!');
    }
    const searchUserName = await User.findOne({ where: { user_name } });
    if (searchUserName) {
      return res.status(404).send('This username is already in use');
    }
    const searchEmail = await User.findOne({ where: { email } });
    if (searchEmail) {
      return res.status(404).send('This email is already in use');
    }

    await User.create({ user_name, password, email });
    res.status(201).send('The user has been created successfully');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { user_name, password }: { user_name: string; password: string } =
    req.body;
  try {
    if (!user_name || !password) {
      return res.status(404).send('¡userName and password are required!');
    }
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const user = await User.findOne({
        where: { user_name },
        include: [
          {
            model: List,
            include: [
              {
                model: Task,
                // Excluimos el campo ListId de las tareas porque rompe mucho los huevos y no lo voy a usar
                attributes: { exclude: ['ListId'] },
              },
            ],
          },
        ],
      });
      return res.status(200).send(user);
    }
    return res.status(404).send('Incorrect credentials');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};
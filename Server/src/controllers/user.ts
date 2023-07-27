import { Request, Response } from 'express';
import { User } from '../db/db.js';
import { IUser } from '../interfaces/index.js';
import bcrypt from 'bcrypt';

export const getUser = async (_: Request, res: Response) => {
  try {
    const getUsers = await User.findAll();
    res.status(200).send(getUsers);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { user_name, password, email }: IUser = req.body;
  try {
    if (!user_name || !password || !email) {
      return res
        .status(404)
        .send('¡userName, email and password are required!');
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
  const { user_name, password } = req.body;
  try {
    if (!user_name || !password) {
      return res.status(404).send('¡userName and password are required!');
    }
    const searchUserName: any = await User.findOne({
      where: { user_name },
    });
    if (searchUserName) {
      const passwordCompare = await bcrypt.compare(
        password,
        searchUserName.password
      );
      if (passwordCompare) return res.status(200).send(searchUserName);
    }
    return res.status(404).send('incorrect credentials');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

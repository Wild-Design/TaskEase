import { Request, Response } from 'express';
import { authenticated } from '../utils/index.js';
import { List, Task } from '../db/db.js';

export const getList = (_: Request, res: Response) => {
  res.status(200).send('getList');
};

export const createList = async (req: Request, res: Response) => {
  const { listName } = req.params;
  const { UserId, user_name, password } = req.body;
  if (!UserId || !user_name || !password)
    return res.status(404).send('UserId, user_name and password are required');
  try {
    const isAutenticated = await authenticated(user_name, password);

    if (isAutenticated) {
      const newList = await List.create({ name: listName, UserId: UserId });
      res.status(200).send(newList);
    } else {
      return res.status(401).send('Unauthenticated user');
    }
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { user_name, password } = req.body;
  try {
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const getList: any = await List.findByPk(listId);

      if (!getList) {
        return res.status(400).send('There is no list with that id');
      }
      const userId = isAutenticated;
      //Compruevo el id del usuario autenticado con el id del usuario del listId
      //para evitar posibles hakeos, solo se puede borrar las listas de los usuarios autenticados.
      if (userId === getList.UserId) {
        const deleteTasks = await Task.destroy({ where: { ListId: listId } });
        const deleteList = await List.destroy({ where: { id: listId } });
        return res.status(200).send({ deleteTasks, deleteList });
      }
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

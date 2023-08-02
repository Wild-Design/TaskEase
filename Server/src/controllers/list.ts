import { Request, Response } from 'express';
import { authenticated } from '../utils/index.js';
import { List, Task } from '../db/db.js';

export const getList = async (_: Request, res: Response) => {
  const getAllLists = await List.findAll();
  res.status(200).send(getAllLists);
};

export const createList = async (req: Request, res: Response) => {
  const { listName } = req.params;
  const { UserId, user_name, password } = req.body;
  if (!UserId || !user_name || !password)
    return res.status(400).send('UserId, user_name and password are required');
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
    if (!user_name || !password) {
      return res.status(400).send('user_name and password are required');
    }
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

export const updateListName = async (req: Request, res: Response) => {
  const { listId } = req.params;
  const { user_name, password, description } = req.body;
  try {
    if (!user_name || !password || !description) {
      return res
        .status(400)
        .send('user_name, password, ListId and description are required');
    }
    const isAutenticated = await authenticated(user_name, password);

    if (isAutenticated) {
      const searchList: any = await List.findByPk(listId);
      if (searchList) {
        searchList.name = description;
        await searchList.save();
        return res.status(200).send('List updated successfully');
      } else {
        return res.status(404).send('There is no list with that id');
      }
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

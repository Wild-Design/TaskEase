import { Request, Response } from 'express';
import { authenticated } from '../utils/index.js';
import { Task, List } from '../db/db.js';
import { Model } from 'sequelize';

export const getTask = async (_: Request, res: Response) => {
  //Posiblemente borre este controlador ya que solo es util en desarrollo para consultar las tareas generales. No le veo uso en el cliente.
  res.status(200).send(await Task.findAll());
};

export const createTask = async (req: Request, res: Response) => {
  /*Primero que nada compruevo que me pasen si o si todos los datos que están en el body, si todo esta bien entonces uso la funcion para ver
    si el usuario esta autenticado(esto lo hice por cuestiones de seguridad), entonces si todo esta bien creo la tarea pasandole la descripción y
    el id de la lista a la que va a pertenecer */
  const { ListId, user_name, password, description } = req.body;
  if (!ListId || !user_name || !password) {
    return res.status(400).send('ListId, user_name and password are required');
  }
  try {
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const createTask: Model = await Task.create({ description, ListId });
      if (createTask) {
        return res.status(201).send(createTask);
      }
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  /*Sensillo, recivo por params el id de la tarea que quiero borrar, me aseguro que el usuario este autenticado y si todo esta bien,
    Reviso primero que la tarea exista entonces busco la tarea y si existe entonces la borro */
  const { taskId, user_name, password } = req.params;
  try {
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const getTask = await Task.findByPk(taskId);
      if (!getTask) {
        return res.status(400).send('The task with that id does not exist');
      }
      const deleteTask: Model | number = await Task.destroy({
        where: { id: taskId },
      });
      return res.status(200).send({ deleteTask });
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

export const updateTaskName = async (req: Request, res: Response) => {
  /* compruevo que me pasen por body todos los campos desestructurados,compruevo que el usuario este autenticado y si todo esta bien entonces,
     busco la tarea para comprobar si existe y si existe la actualizo. */
  const { taskId } = req.params;
  const { user_name, password, description } = req.body;
  try {
    if (!user_name || !password || !description) {
      return res
        .status(400)
        .send('user_name, password, and description are required');
    }
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const searchTask: any = await Task.findByPk(taskId);
      if (searchTask) {
        searchTask.description = description;
        await searchTask.save();
        return res.status(200).send('Task updated successfully');
      } else {
        return res.status(404).send('There is no Task with that id');
      }
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

export const transferTask = async (req: Request, res: Response) => {
  /*Nececito que por params se me pase el id de la tarea que se quiere mover y el id de la lista a la que se desea mover dicha tarea.
    Me aseguro que los campos se pasen si o si y me aseguro que el usuario este autenticado, si todo esta bien entonces busco si existe
    la tarea y la lista, si existen entonces solo cambio la propiedad ListId de la tarea por el id de la lista pasada por params y la actualizo */
  const { taskId, destinationListId } = req.params;
  const { user_name, password } = req.body;
  try {
    const isAutenticated = await authenticated(user_name, password);
    if (isAutenticated) {
      const ifTaskExist: any = await Task.findByPk(taskId);
      const ifDestinationListExist = await List.findByPk(destinationListId);
      if (ifTaskExist && ifDestinationListExist) {
        ifTaskExist.ListId = destinationListId;
        await ifTaskExist.save();
        return res.status(200).send('Task moved successfully');
      } else {
        return res.status(404).send('Incorrect task Id or destination ListId');
      }
      /*Antes de hacer los cambios me aseguro de que el id de la tarea y el id de la lista pasados por params existan,
      entonces si existen actualizo el id de la tarea por el de la lista actual y de esa forma ya queda la tarea y la lista actualizada */
    }
    return res.status(401).send('Unauthenticated user');
  } catch (error: any) {
    res
      .status(500)
      .send({ error: 'Internal server error', message: error.message });
  }
};

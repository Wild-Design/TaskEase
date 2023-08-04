import { authenticated } from '../utils/index.js';
import { List, Task } from '../db/db.js';
export const getList = async (_, res) => {
    const getAllLists = await List.findAll();
    res.status(200).send(getAllLists);
};
export const createList = async (req, res) => {
    /*Aquí como en casi todos los endpoints me aseguro que todos los datos desestructurados se pasen si o si, y me fijo si esta autenticado.
      Entonces si esta autenticado creo una nueva lista y muy importante a esa lista le pongo el nombre pasado por params y el UserId pasa asociar
      la lista a su usuario perteneciente.*/
    const { listName } = req.params;
    const { UserId, user_name, password } = req.body;
    if (!UserId || !user_name || !password)
        return res.status(400).send('UserId, user_name and password are required');
    try {
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const newList = await List.create({ name: listName, UserId: UserId });
            res.status(200).send(newList);
        }
        else {
            return res.status(401).send('Unauthenticated user');
        }
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};
export const deleteList = async (req, res) => {
    /*Bueno aca hice algunas cosas diferentes con respecto a otros endpoints, quise aplicar una lógica mas segura y asegurarme no solo que el usuario este autenticado
      si no que  también me aseguro que la lista que se va a borrar sea solo de ese usuario y de nadie más.
      Como siempre primero me aseguro  que todos los datos desestructurados se pasen si o si, luego me aseguro que este autenticado y aquí es donde devo explicar con mas detalle
      la función de (autenticated).Esta función devuelve el ID del usuario si esta autenticado. Entonces lo que hago primero traer la lista para comprobar si existe
      entonces si la lista existe lo que hago es comparar el UserId de la lista con el id de la funcion (autenticated), es justo aqui donde yo me aseguro que solo sea el
      usuario dueño de esa lista el que puede borrar. Si todo esta bien se borra la lista y todas las tareas pertenecientes a esa lista.*/
    const { listId } = req.params;
    const { user_name, password } = req.body;
    try {
        if (!user_name || !password) {
            return res.status(400).send('user_name and password are required');
        }
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const getList = await List.findByPk(listId);
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
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};
export const updateListName = async (req, res) => {
    /* Me aseguro que se pasen si o si todos los datos desestructurados, también me aseguro si esta autenticado y si todo esta bien entonces
    busco la lista para comprobar si existe y si existe entonces actualizo la propiedad name de la lista con el valor de description.
     */
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
            const searchList = await List.findByPk(listId);
            if (searchList) {
                searchList.name = description;
                await searchList.save();
                return res.status(200).send('List updated successfully');
            }
            else {
                return res.status(404).send('There is no list with that id');
            }
        }
        return res.status(401).send('Unauthenticated user');
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};

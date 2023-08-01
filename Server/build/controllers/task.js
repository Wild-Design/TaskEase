import { authenticated } from '../utils/index.js';
import { Task } from '../db/db.js';
export const getTask = async (_, res) => {
    res.status(200).send(await Task.findAll());
};
export const createTask = async (req, res) => {
    const { ListId, user_name, password, description } = req.body;
    if (!ListId || !user_name || !password) {
        return res.status(400).send('ListId, user_name and password are required');
    }
    try {
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const createTask = await Task.create({ description, ListId });
            if (createTask) {
                return res.status(201).send(createTask);
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
export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const { user_name, password } = req.body;
    try {
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const getTask = await Task.findByPk(taskId);
            if (!getTask) {
                return res.status(400).send('The task with that id does not exist');
            }
            const deleteTask = await Task.destroy({ where: { id: taskId } });
            return res.status(200).send({ deleteTask });
        }
        return res.status(401).send('Unauthenticated user');
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};

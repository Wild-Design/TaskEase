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
        if (!user_name || !password) {
            return res.status(400).send('user_name and password are required');
        }
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const getTask = await Task.findByPk(taskId);
            if (!getTask) {
                return res.status(400).send('The task with that id does not exist');
            }
            const deleteTask = await Task.destroy({
                where: { id: taskId },
            });
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
export const updateTaskName = async (req, res) => {
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
            const searchTask = await Task.findByPk(taskId);
            if (searchTask) {
                searchTask.description = description;
                await searchTask.save();
                return res.status(200).send('Task updated successfully');
            }
            else {
                return res.status(404).send('There is no Task with that id');
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

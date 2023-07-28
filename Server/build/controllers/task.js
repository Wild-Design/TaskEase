import { authenticated } from '../utils/index.js';
import { Task } from '../db/db.js';
export const getTask = (_, res) => {
    res.status(200).send('getTask');
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

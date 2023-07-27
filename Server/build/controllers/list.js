import { authenticated } from '../utils/index.js';
import { List } from '../db/db.js';
export const getList = (_, res) => {
    res.status(200).send('getList');
};
export const createList = async (req, res) => {
    const { listName } = req.params;
    const { UserId, user_name, password } = req.body;
    if (!UserId || !user_name || !password)
        return res.status(404).send('UserId, user_name and password are required');
    try {
        const isAutenticated = await authenticated(user_name, password);
        if (isAutenticated) {
            const newList = await List.create({ name: listName, UserId: UserId });
            res.status(200).send(newList);
        }
        else {
            return res.status(404).send('unauthenticated user');
        }
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};

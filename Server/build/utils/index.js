import { User } from '../db/db.js';
import bcrypt from 'bcrypt';
export const authenticated = async (userName, password) => {
    const searchUserName = await User.findOne({
        where: { user_name: userName },
    });
    if (searchUserName) {
        const passwordCompare = await bcrypt.compare(password, searchUserName.password);
        if (passwordCompare)
            return searchUserName.id; //el id lo utilizo para hacer mas seguros otros endpoints como los de borrar listas y tareas
    }
    return false;
};

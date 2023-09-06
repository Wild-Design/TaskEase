import { User, List, Task } from '../db/db.js';
import { authenticated } from '../utils/index.js';
export const getUser = async (_, res) => {
    try {
        const getUsers = await User.findAll();
        res.status(200).send(getUsers);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
};
export const register = async (req, res) => {
    /*
    Primero compruevo que si o si me llegue por body el user_name, password y email, luego compruevo si cumplen con el test de expreciones regulares para validar
    de que no tengan caracteres raros o que el mail no sea cualquier cosa y todo eso.
    Luego, si los datos estan bien entonces busco el usuario en la db, (si el usuario existe entonces no deberia crearse y por eso respondo con un 404 de que el usuario ya existe,
    la misma lógica hago con el email porque debe haber un solo email).
    Entonces si pasa todo esto correctamente se crea el nuevo user.
    */
    const { user_name, password, email } = req.body;
    try {
        if (!user_name || !password || !email) {
            return res
                .status(404)
                .send('¡user_name, email and password are required!');
        }
        const usernameRegex = /^(?!.*\s.*\s)[a-zA-Z ]{6,20}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,20}$/;
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (!usernameRegex.test(user_name))
            return res
                .status(404)
                .send('Incorrect user_name!  It must have at least 6 characters and a maximum of 15, they can only be letters of the alphabet.');
        if (!passwordRegex.test(password))
            return res
                .status(404)
                .send('Incorrect password!: It must have at least one capital letter, one number, at least 6 characters and a maximum of 15');
        if (!emailRegex.test(email))
            return res.status(404).send('Incorrect email');
        const searchUserName = await User.findOne({
            where: { user_name },
        });
        if (searchUserName) {
            return res.status(404).send('This username is already in use');
        }
        const searchEmail = await User.findOne({ where: { email } });
        if (searchEmail) {
            return res.status(404).send('This email is already in use');
        }
        await User.create({ user_name, password, email });
        res.status(201).send('The user has been created successfully');
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};
export const login = async (req, res) => {
    /*Aquí lo que hice fue comprobar si esta autenticado pasandole a la funcion de isAutenticated el username y el password,
    si esta autenticado entonces traigo al usuario de la db e incluyo el modelo List y también sus tareas, al final lo que mando al cliente son
    practicamente todos sus datos personales con todas sus listas y tareas.*/
    const { userName, password } = req.params;
    try {
        const isAutenticated = await authenticated(userName, password);
        if (isAutenticated) {
            const user = await User.findOne({
                where: { user_name: userName },
                include: [
                    {
                        model: List,
                        include: [
                            {
                                model: Task,
                                // Excluimos el campo ListId de las tareas porque no lo voy a usar
                                attributes: { exclude: ['ListId'] },
                            },
                        ],
                    },
                ],
            });
            return res.status(200).send(user);
        }
        return res.status(404).send('Incorrect credentials');
    }
    catch (error) {
        res
            .status(500)
            .send({ error: 'Internal server error', message: error.message });
    }
};

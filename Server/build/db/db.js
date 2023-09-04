import { Sequelize } from 'sequelize';
import modelUser from './models/User.js';
import modelTask from './models/Task.js';
import modelList from './models/List.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
config();
const { USER, PASSWORD, HOST, DB_PORT, DB_NAME } = process.env;
// const { DB_DEPLOY } = process.env;
const sequelize = new Sequelize(`postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`
// DB_DEPLOY!,
// {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
//   logging: false,
// }
);
modelUser(sequelize);
modelTask(sequelize);
modelList(sequelize);
export const { User, List, Task } = sequelize.models;
User.beforeCreate(async (user) => {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
});
User.hasMany(List);
List.belongsTo(User);
List.hasMany(Task);
Task.belongsTo(List);
export default sequelize;

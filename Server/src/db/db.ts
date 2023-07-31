import { Sequelize } from 'sequelize';
import modelUser from './models/User.js';
import modelTask from './models/Task.js';
import modelList from './models/List.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
config();

const { USER, PASSWORD, HOST, DB_PORT, DB_NAME } = process.env;
const sequelize: Sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

modelUser(sequelize);
modelTask(sequelize);
modelList(sequelize);

export const { User, List, Task } = sequelize.models;

User.beforeCreate(async (user: any) => {
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
});

User.hasMany(List);
List.belongsTo(User);

List.hasMany(Task);
Task.belongsTo(List);

export default sequelize;

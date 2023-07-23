import { Sequelize } from 'sequelize';
import modelUser from './models/User.js';
import modelTask from './models/Task.js';
import modelList from './models/List.js';
import { config } from 'dotenv';
config();

const { USER, PASSWORD, HOST, PORT, DB_NAME } = process.env;
const sequelize: Sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
  { logging: false }
);

modelUser(sequelize);
modelTask(sequelize);
modelList(sequelize);

const { User, List, Task } = sequelize.models;

User.hasMany(List);
List.belongsTo(User);

List.hasMany(Task);
Task.belongsTo(List);

export default sequelize;

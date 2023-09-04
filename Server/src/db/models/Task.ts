import { Sequelize, UUIDV4, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      description: {
        type: DataTypes.STRING(700),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

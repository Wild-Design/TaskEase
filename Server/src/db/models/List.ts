import { Sequelize, UUIDV4, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  sequelize.define(
    'List',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

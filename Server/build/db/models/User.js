import { UUIDV4, DataTypes } from 'sequelize';
export default (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

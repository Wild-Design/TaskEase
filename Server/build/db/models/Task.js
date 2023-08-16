import { UUIDV4, DataTypes } from 'sequelize';
export default (sequelize) => {
    sequelize.define('Task', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        description: {
            type: DataTypes.STRING(700),
            allowNull: false,
        },
    }, { timestamps: false });
};

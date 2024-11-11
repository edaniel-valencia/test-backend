import { DataTypes } from "sequelize";
import sequelize from "../database/conexion";
import { Category } from "./category";


export const User = sequelize.define("user", {
    Uid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Uname: { type: DataTypes.STRING, allowNull: false },
    Ulastname: { type: DataTypes.STRING, allowNull: false },
    Uemail: { type: DataTypes.STRING, allowNull: false },
    Uwhatsapp: { type: DataTypes.STRING, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'Cid' }, allowNull: false },

    Ustatus: { type: DataTypes.INTEGER, allowNull: false },
    Ucreated: { type: DataTypes.DATE, field: 'Ucreated', defaultValue: DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
});


Category.hasMany(User, { foreignKey: 'CategoryId', as: 'users'})
User.belongsTo(Category, { foreignKey: 'CategoryId', as: 'categories'})

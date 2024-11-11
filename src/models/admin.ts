import { DataTypes } from "sequelize";
import sequelize from "../database/conexion";
import { Category } from "./category";


export const Admin = sequelize.define("admin", {
    Aid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Aname: { type: DataTypes.STRING, allowNull: false },
    Alastname: { type: DataTypes.STRING, allowNull: false },
    Aemail: { type: DataTypes.STRING, allowNull: false },
    Awhatsapp: { type: DataTypes.STRING, allowNull: false },
    Apassword: { type: DataTypes.STRING, allowNull: false },

    Astatus: { type: DataTypes.INTEGER, allowNull: false },
    Acreated: { type: DataTypes.DATE, field: 'Acreated', defaultValue: DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
});

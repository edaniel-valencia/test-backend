import { DataTypes } from "sequelize";
import sequelize from "../database/conexion";


export const Category = sequelize.define("category", {
    Cid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Cname: { type: DataTypes.STRING, allowNull: false },
    Cstatus: { type: DataTypes.INTEGER, allowNull: false },
    Ccreated: { type: DataTypes.DATE, field: 'Ccreated', defaultValue: DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
})
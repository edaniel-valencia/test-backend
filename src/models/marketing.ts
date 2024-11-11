import { DataTypes } from "sequelize";
import sequelize from "../database/conexion";


export const Marketing = sequelize.define("marketing", {
    Mid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Mtitle: { type: DataTypes.STRING, allowNull: false },
    Mimage: { type: DataTypes.STRING, allowNull: false },
    Mmessage: { type: DataTypes.TEXT, allowNull: false },
    Mtype: { type: DataTypes.STRING, allowNull: false },
    Mstatus: { type: DataTypes.INTEGER, allowNull: false },
    Mcreated: { type: DataTypes.DATE, field: 'Mcreated', defaultValue: DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
})

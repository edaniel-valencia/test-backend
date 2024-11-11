import { DataTypes } from "sequelize";
import sequelize from "../database/conexion";


export const Config = sequelize.define("config", {
    Cid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Chost: { type: DataTypes.STRING, allowNull: false },
    Cport: { type: DataTypes.STRING, allowNull: false },
    Csecure: { type: DataTypes.STRING, allowNull: false },
    Cauth: { type: DataTypes.STRING, allowNull: false },
    Cpass: { type: DataTypes.STRING, allowNull: false },
    Cstatus: { type: DataTypes.INTEGER, allowNull: false },
    Ccreated: { type: DataTypes.DATE, field: 'Ccreated', defaultValue: DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
})
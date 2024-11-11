"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../database/conexion"));
exports.Config = conexion_1.default.define("config", {
    Cid: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Chost: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Cport: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Csecure: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Cauth: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Cpass: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Cstatus: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    Ccreated: { type: sequelize_1.DataTypes.DATE, field: 'Ccreated', defaultValue: sequelize_1.DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
});

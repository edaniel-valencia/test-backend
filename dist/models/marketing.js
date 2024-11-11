"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marketing = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../database/conexion"));
exports.Marketing = conexion_1.default.define("marketing", {
    Mid: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Mtitle: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Mimage: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Mmessage: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    Mtype: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Mstatus: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    Mcreated: { type: sequelize_1.DataTypes.DATE, field: 'Mcreated', defaultValue: sequelize_1.DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
});

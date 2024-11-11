"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../database/conexion"));
exports.Admin = conexion_1.default.define("admin", {
    Aid: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Aname: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Alastname: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Aemail: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Awhatsapp: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Apassword: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    Astatus: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    Acreated: { type: sequelize_1.DataTypes.DATE, field: 'Acreated', defaultValue: sequelize_1.DataTypes.NOW, allowNull: false }
}, {
    timestamps: false,
    paranoid: false
});

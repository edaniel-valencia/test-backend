"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.CreateUser = exports.CargarDatosOfExcel = exports.ReadUserAllId = exports.ReadUserAll = exports.ReadUserPublic = void 0;
const user_1 = require("../models/user");
const category_1 = require("../models/category");
const XLSX = __importStar(require("xlsx"));
const ReadUserPublic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield user_1.User.findAll();
    res.json(listUser);
});
exports.ReadUserPublic = ReadUserPublic;
const ReadUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const listUser = yield user_1.User.findAll({
            include: [{
                    model: category_1.Category,
                    as: 'categories'
                }]
        });
        if (listUser.length === 0) {
            return res.status(404).json({ message: "No se han encontrado usuarios" });
        }
        res.json(listUser);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al encontrado usuarios", error });
    }
});
exports.ReadUserAll = ReadUserAll;
const ReadUserAllId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const listUser = yield user_1.User.findAll({
            where: { CategoryId: categoryId },
            include: [{
                    model: category_1.Category,
                    as: 'categories'
                }]
        });
        if (listUser.length === 0) {
            return res.status(404).json({ message: "No se han encontrado usuarios" });
        }
        res.json(listUser);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al encontrado usuarios", error });
    }
});
exports.ReadUserAllId = ReadUserAllId;
const CargarDatosOfExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ningun archivo' });
        }
        const fileBuffer = req.file.buffer;
        const workBook = XLSX.read(fileBuffer, { type: "buffer" });
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        const users = data.slice(1).map((row) => ({
            Uname: row[0],
            Ulastname: row[1],
            Uemail: row[2],
            Uwhatsapp: row[3],
            CategoryId: row[4],
            Ustatus: 1
        }));
        yield user_1.User.bulkCreate(users);
        res.status(200).json({ message: 'Mensaje enviado exitosamente' });
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});
exports.CargarDatosOfExcel = CargarDatosOfExcel;
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Uname, Ulastname, Uemail, Uwhatsapp, CategoryId } = req.body;
    console.log(req.body);
    try {
        user_1.User.create({
            Uname: Uname,
            Ulastname: Ulastname,
            Uemail: Uemail,
            Uwhatsapp: Uwhatsapp,
            CategoryId: CategoryId,
            Ustatus: 1,
        });
        res.status(200).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.log("Error al crear el usuario: ", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
exports.CreateUser = CreateUser;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Uid } = req.params;
    const { Uname, Ulastname, Uemail, Uwhatsapp, CategoryId, Ustatus } = req.body;
    const user = yield user_1.User.findOne({ where: { Uid: Uid } });
    if (!user) {
        res.status(404).json(`No se ha encontrado el usuarios ${Uid} con ${Uemail} `);
    }
    try {
        user_1.User.update({
            Uname: Uname,
            Ulastname: Ulastname,
            Uemail: Uemail,
            Uwhatsapp: Uwhatsapp,
            CategoryId: CategoryId,
            Ustatus: Ustatus,
        }, {
            where: { Uid: Uid }
        });
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    }
    catch (error) {
        console.log("Error al actualizar el usuario: ", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Uid } = req.params;
    const user = yield user_1.User.findOne({ where: { Uid: Uid } });
    if (!user) {
        res.status(404).json(`No se ha encontrado el usuarios ${Uid}  `);
    }
    try {
        user_1.User.destroy({ where: { Uid: Uid }
        });
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        console.log("Error al eliminar el usuario: ", error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});
exports.DeleteUser = DeleteUser;

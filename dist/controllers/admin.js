"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Auth = void 0;
const admin_1 = require("../models/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Aemail, Apassword } = req.body;
    const admin = yield admin_1.Admin.findOne({ where: { Aemail: Aemail } });
    if (!admin) {
        return res.status(400).json({
            message: `No existe el usuario ${Aemail}`
        });
    }
    console.log(req.body);
    const passwordBcryptValid = yield bcrypt_1.default.compare(Apassword, admin.Apassword);
    if (!passwordBcryptValid) {
        return res.status(400).json({
            message: `La contraseña es incorrecta del usuario ${Aemail}`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        Aemail: Aemail,
        Aid: admin.Aid,
        Aname: admin.Aname,
        Alastname: admin.Alastname
    }, process.env.SECRET_KEY || 'Edaniel-Valencia');
    console.log(token);
    if (token) {
        res.json({ token });
    }
});
exports.Auth = Auth;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Aname, Alastname, Aemail, Awhatsapp, Apassword } = req.body;
    const admin = yield admin_1.Admin.findOne({ where: { Aemail: Aemail } });
    if (admin) {
        return res.status(400).json({
            message: `Administrador ya existe con ese correo ${Aemail}`
        });
    }
    console.log(req.body);
    const passwordBcrypt = yield bcrypt_1.default.hash(Apassword, 10);
    try {
        admin_1.Admin.create({
            Aname: Aname,
            Alastname: Alastname,
            Aemail: Aemail,
            Awhatsapp: Awhatsapp,
            Apassword: passwordBcrypt,
            Astatus: 1
        });
        return res.status(200).json({
            message: `Administrador creado de manera Exitosa`
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Error `
        });
    }
});
exports.Register = Register;

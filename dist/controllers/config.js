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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = exports.Delete = exports.Create = exports.Read = void 0;
const config_1 = require("../models/config");
const Read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listConfig = yield config_1.Config.findAll();
    res.json(listConfig);
});
exports.Read = Read;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Chost, Cport, Csecure, Cauth, Cpass } = req.body;
    try {
        config_1.Config.create({
            Chost: Chost,
            Cport: Cport,
            Csecure: Csecure,
            Cauth: Cauth,
            Cpass: Cpass,
            Cstatus: 1
        });
        res.status(200).json('Exitoso');
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
    }
});
exports.Create = Create;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cid } = req.params;
    const config = yield config_1.Config.findOne({ where: { Cid: Cid } });
    if (!config) {
        return res.status(404).json({
            message: `No se ha encontrado registro con el Id ${Cid}`
        });
    }
    try {
        config_1.Config.destroy({ where: { Cid: Cid } });
        return res.status(200).json({
            message: `Elimado Exitosa con Id ${Cid}`
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Erro al actualizar el registro con Id ${Cid}`
        });
    }
});
exports.Delete = Delete;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cid } = req.params;
    const { Chost, Cport, Csecure, Cauth, Cpass } = req.body;
    console.log(req.body);
    const config = yield config_1.Config.findOne({ where: { Cid: Cid } });
    if (!config) {
        return res.status(404).json({
            message: `No se ha encontrado registro con el Id ${Cid}`
        });
    }
    try {
        config_1.Config.update({
            Chost: Chost,
            Cport: Cport,
            Csecure: Csecure,
            Cauth: Cauth,
            Cpass: Cpass,
            Cstatus: 1
        }, {
            where: { Cid: Cid }
        });
        return res.status(200).json({
            message: `Actualización Exitosa con Id ${Cid}`
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Erro al actualizar el registro con Id ${Cid}`
        });
    }
});
exports.Update = Update;

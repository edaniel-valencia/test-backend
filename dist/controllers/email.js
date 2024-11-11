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
exports.sendMasiveByCategory = exports.SendEmailMasive = exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../models/user");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../models/config");
const marketing_1 = require("../models/marketing");
const category_1 = require("../models/category");
const SendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Estoy aca");
    const { name, lastname, whatsapp, email, subject, message } = req.body;
    console.log(req.body);
    const config = yield config_1.Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);
    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' });
    }
    const from = config.get('Cauth');
    const to = 'tsoftwareecuador@gmail.com';
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: config.get('Chost'),
            port: parseInt(config.get('Cport')),
            secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
            auth: {
                user: config.get('Cauth'),
                pass: config.get('Cpass')
            }
        });
        const mailOptions = {
            to: to,
            from: from,
            subject: `${subject} CORREO DESDE LA WEB`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <img src="https://www.software.com.ec/assets/logo.f8e0acb1.png" width="25%">
                    <h1 style="color: #007bff;">¡MENSAJE DESDE EL SITIO WEB!</h1>
                    <p>Te ha enviado este correo ${name} ${lastname}, y esto son los contactos para comunicarse:
                    <br><b>Correo: </b> ${email}
                    <br><b>WhatsApp: </b> ${whatsapp}
                    <br><b>Mensaje: </b>${message}</p>
                    <img src="https://img.freepik.com/vector-premium/conjunto-ilustraciones-3d-gestion-tiempo-caracter-usando-recordatorio-notificacion-seguimiento-tiempo_808510-1476.jpg" width="25%">
                    <p style="font-size: 14px; color: #555;">Saludos,<br>El equipo de soporte</p>
                </div>
            `,
        };
        // Enviar correo
        const info = yield transporter.sendMail(mailOptions);
        console.log("Mensaje enviado exitosamente", info.response);
        res.status(200).json({ message: 'Mensaje enviado exitosamente', info: info.response, to: to, from: from });
        user_1.User.create({
            Uname: name,
            Ulastname: lastname,
            Uemail: email,
            Uwhatsapp: whatsapp,
            CategoryId: 1,
            Ustatus: 1
        });
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});
exports.SendEmail = SendEmail;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.findAll();
    return users;
});
const SendEmailMasive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message } = req.body;
    const file = req.file;
    console.log("Estoy aca", req.body);
    if (!file) {
        return res.status(400).json({
            message: "No se subió ninguna imagen"
        });
    }
    const uploadPath = path_1.default.join('./assets/marketing');
    if (!fs_1.default.existsSync(uploadPath)) {
        fs_1.default.mkdirSync(uploadPath, { recursive: true });
    }
    const fileName = `image-marketing-TSE-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path_1.default.join(uploadPath, fileName);
    fs_1.default.writeFileSync(filePath, file.buffer);
    const imageURL = `http://localhost:3001/assets/marketing/${fileName}`;
    const config = yield config_1.Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);
    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' });
    }
    const from = config.get('Cauth');
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: config.get('Chost'),
            port: parseInt(config.get('Cport')),
            secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
            auth: {
                user: config.get('Cauth'),
                pass: config.get('Cpass')
            }
        });
        const listEmail = yield getUser();
        if (listEmail.length === 0) {
            res.status(404).json({ message: 'No se han encontrado datos' });
        }
        for (const user of listEmail) {
            const email = user.get('Uemail');
            const name = user.get('Uname');
            const lastname = user.get('Ulastname');
            const mailOptions = {
                to: email,
                from: from,
                subject: 'Edaniel Valencia te invita a ' + title,
                // text:  'Hola desde Tsoftware Ecuador, Envio de Correo con Angular y TypeScript!'
                html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <img src="https://www.software.com.ec/assets/logo.f8e0acb1.png" width="25%">
                <h1 style="color: #007bff;">¡MENSAJE DESDE EL SITIO WEB!</h1>
                <p>Te ha enviado este correo ${name} ${lastname}, y esto son los contactos mas comunicarse:
                <br><b>Correo: </b> ${email}
                <br><b>Mensaje: </b>${message}</p>                
                <img src="${imageURL}" width="50%">
                <img src="https://img.freepik.com/vector-premium/conjunto-ilustraciones-3d-gestion-tiempo-caracter-usando-recordatorio-notificacion-seguimiento-tiempo_808510-1476.jpg" width="25%">
                <p style="font-size: 14px; color: #555;">Saludos,<br>El equipo de soporte</p>
            </div>
        `,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log("Mensaje enviado exitosamente", info.response);
        }
        try {
            marketing_1.Marketing.create({
                Mtitle: title,
                Mmessage: message,
                Mtype: 'Todos los correos del sistema',
                Mstatus: 1
            });
            res.status(200).json({ message: 'Mensaje masivo, guardado exitosamente' });
        }
        catch (error) {
            console.log("Error al guardar el mensaje masivo", error);
        }
        res.status(200).json({ message: 'Mensajes enviados exitosamente' });
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});
exports.SendEmailMasive = SendEmailMasive;
const sendMasiveByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message } = req.body;
    const { Cid } = req.params;
    const file = req.file;
    console.log("Data: ", req.body);
    console.log("Category Id: ", Cid);
    if (!file) {
        return res.status(400).json({
            message: "No se subió ninguna imagen"
        });
    }
    const uploadPath = path_1.default.join('./assets/marketing');
    if (!fs_1.default.existsSync(uploadPath)) {
        fs_1.default.mkdirSync(uploadPath, { recursive: true });
    }
    const fileName = `image-marketing-TSE-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path_1.default.join(uploadPath, fileName);
    fs_1.default.writeFileSync(filePath, file.buffer);
    const imageURL = `http://localhost:3001/assets/marketing/${fileName}`;
    const config = yield config_1.Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);
    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' });
    }
    const from = config.get('Cauth');
    try {
        const listEmail = yield user_1.User.findAll({ where: { CategoryId: Cid } });
        const listCategory = yield category_1.Category.findOne({ where: { Cid: Cid } });
        if (listEmail.length === 0) {
            res.status(404).json({ message: 'No se han encontrado datos' });
        }
        for (const user of listEmail) {
            const email = user.get('Uemail');
            const name = user.get('Uname');
            const lastname = user.get('Ulastname');
            const transporter = nodemailer_1.default.createTransport({
                host: config.get('Chost'),
                port: parseInt(config.get('Cport')),
                secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
                auth: {
                    user: config.get('Cauth'),
                    pass: config.get('Cpass')
                }
            });
            const mailOptions = {
                to: email,
                from: from,
                subject: 'Edaniel Valencia te invita a ' + title,
                // text:  'Hola desde Tsoftware Ecuador, Envio de Correo con Angular y TypeScript!'
                html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <img src="https://www.software.com.ec/assets/logo.f8e0acb1.png" width="25%">
                <h1 style="color: #007bff;">¡MENSAJE DESDE EL SITIO WEB!</h1>
                <p>Te ha enviado este correo ${name} ${lastname}, y esto son los contactos mas comunicarse:
                <br><b>Correo: </b> ${email}
                <br><b>Mensaje: </b>${message}</p>                
                <img src="${imageURL}" width="50%">
                <img src="https://img.freepik.com/vector-premium/conjunto-ilustraciones-3d-gestion-tiempo-caracter-usando-recordatorio-notificacion-seguimiento-tiempo_808510-1476.jpg" width="25%">
                <p style="font-size: 14px; color: #555;">Saludos,<br>El equipo de soporte</p>
            </div>
        `,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log("Mensaje enviado exitosamente", info.response);
        }
        const type = `${listCategory === null || listCategory === void 0 ? void 0 : listCategory.dataValues.Cname}`;
        try {
            marketing_1.Marketing.create({
                Mtitle: title,
                Mimage: fileName,
                Mmessage: message,
                Mtype: type,
                Mstatus: 1
            });
            res.status(200).json({ message: 'Mensaje masivo, guardado exitosamente' });
        }
        catch (error) {
            console.log("Error al guardar el mensaje masivo", error);
        }
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});
exports.sendMasiveByCategory = sendMasiveByCategory;

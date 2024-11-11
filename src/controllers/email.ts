import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import { User } from "../models/user";
import fs from 'fs';
import path from 'path';
import { Config } from "../models/config";
import { Marketing } from "../models/marketing";
import { Category } from "../models/category";






export const SendEmail = async (req: Request, res: Response) => {

    console.log("Estoy aca");

    const { name, lastname, whatsapp, email, subject, message } = req.body
    console.log(req.body);

    const config = await Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);

    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' })
    }

    const from = config.get('Cauth') as string;
    const to = 'tsoftwareecuador@gmail.com';
    try {

        const transporter = nodemailer.createTransport({

            host: config.get('Chost') as string,
            port: parseInt(config.get('Cport') as string),
            secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
            auth: {
                user: config.get('Cauth') as string,
                pass: config.get('Cpass') as string
            }
        })

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
        const info = await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado exitosamente", info.response);

        res.status(200).json({ message: 'Mensaje enviado exitosamente', info: info.response, to: to, from: from });
        User.create({
            Uname: name,
            Ulastname: lastname,
            Uemail: email,
            Uwhatsapp: whatsapp,
            CategoryId: 1,
            Ustatus: 1
        })

    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}


const getUser = async () => {
    const users = await User.findAll()
    return users
}

export const SendEmailMasive = async (req: Request, res: Response) => {

    const { title, message } = req.body

    const file = req.file;

    console.log("Estoy aca", req.body);

    if (!file) {
        return res.status(400).json({
            message: "No se subió ninguna imagen"
        });
    }



    const uploadPath = path.join('./assets/marketing');

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `image-marketing-TSE-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path.join(uploadPath, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const imageURL = `http://localhost:3001/assets/marketing/${fileName}`


    const config = await Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);

    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' })
    }

    const from = config.get('Cauth') as string;

    try {

        const transporter = nodemailer.createTransport({

            host: config.get('Chost') as string,
            port: parseInt(config.get('Cport') as string),
            secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
            auth: {
                user: config.get('Cauth') as string,
                pass: config.get('Cpass') as string
            }
        })


        const listEmail = await getUser()

        if (listEmail.length === 0) {
            res.status(404).json({ message: 'No se han encontrado datos' });
        }

        for (const user of listEmail) {

            const email = user.get('Uemail') as string
            const name = user.get('Uname') as string
            const lastname = user.get('Ulastname') as string

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
            }


            const info = await transporter.sendMail(mailOptions);
            console.log("Mensaje enviado exitosamente", info.response);

        }


        try {
            Marketing.create({
                Mtitle: title,
                Mmessage: message,
                Mtype: 'Todos los correos del sistema',
                Mstatus: 1
            });
            res.status(200).json({ message: 'Mensaje masivo, guardado exitosamente' });

        } catch (error) {
            console.log("Error al guardar el mensaje masivo", error);

        }

        res.status(200).json({ message: 'Mensajes enviados exitosamente' });

    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}











export const sendMasiveByCategory = async (req: Request, res: Response) => {

    const { title, message } = req.body
    const { Cid } = req.params
    const file = req.file;

    console.log("Data: ", req.body);
    console.log("Category Id: ", Cid);


    if (!file) {
        return res.status(400).json({
            message: "No se subió ninguna imagen"
        });
    }



    const uploadPath = path.join('./assets/marketing');

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `image-marketing-TSE-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path.join(uploadPath, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const imageURL = `http://localhost:3001/assets/marketing/${fileName}`

    const config = await Config.findOne({ where: { Cstatus: 1 } });
    console.log(config);

    if (!config) {
        return res.status(500).json({ error: 'No se ha encontrado servidor' })
    }

    const from = config.get('Cauth') as string;
    try {

        const listEmail = await User.findAll({ where: { CategoryId: Cid } });

        const listCategory = await Category.findOne({ where: { Cid: Cid } });



        if (listEmail.length === 0) {
            res.status(404).json({ message: 'No se han encontrado datos' });
        }


        for (const user of listEmail) {

            const email = user.get('Uemail') as string
            const name = user.get('Uname') as string
            const lastname = user.get('Ulastname') as string

            const transporter = nodemailer.createTransport({

                host: config.get('Chost') as string,
                port: parseInt(config.get('Cport') as string),
                secure: config.get('Csecure') === 'true' || config.get('Csecure') === 'false',
                auth: {
                    user: config.get('Cauth') as string,
                    pass: config.get('Cpass') as string
                }
            })
    

            
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
            }


            const info = await transporter.sendMail(mailOptions);
            console.log("Mensaje enviado exitosamente", info.response);
        }
        const type = `${listCategory?.dataValues.Cname}`
        try {
            Marketing.create({
                Mtitle: title,
                Mimage: fileName,
                Mmessage: message,
                Mtype: type,
                Mstatus: 1
            });
            res.status(200).json({ message: 'Mensaje masivo, guardado exitosamente' });

        } catch (error) {
            console.log("Error al guardar el mensaje masivo", error);

        }



    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}


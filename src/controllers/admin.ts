import { Request, Response } from "express";
import { Admin } from "../models/admin";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const Auth = async (req: Request, res: Response) => {

    const { Aemail, Apassword } = req.body

    const admin: any = await Admin.findOne({ where: { Aemail: Aemail } });

    if (!admin) {
        return res.status(400).json({
            message: `No existe el usuario ${Aemail}`
        });
    }

    console.log(req.body);

    const passwordBcryptValid = await bcrypt.compare(Apassword, admin.Apassword)

    if (!passwordBcryptValid) {
        return res.status(400).json({
            message: `La contraseña es incorrecta del usuario ${Aemail}`
        });
    }

    const token = jwt.sign({
        Aemail: Aemail,
        Aid: admin.Aid,
        Aname: admin.Aname,
        Alastname: admin.Alastname
    }, process.env.SECRET_KEY || 'Edaniel-Valencia',
        //  {expiresIn: '10000'}
    );

    console.log(token);
    

    if (token) {
        res.json({ token })

    }

}


export const Register = async (req: Request, res: Response) => {

    const { Aname, Alastname, Aemail, Awhatsapp, Apassword } = req.body
    const admin = await Admin.findOne({ where: { Aemail: Aemail } });

    if (admin) {
        return res.status(400).json({
            message: `Administrador ya existe con ese correo ${Aemail}`
        });
    }

    console.log(req.body);

    const passwordBcrypt = await bcrypt.hash(Apassword, 10)

    try {

        Admin.create({
            Aname: Aname,
            Alastname: Alastname,
            Aemail: Aemail,
            Awhatsapp: Awhatsapp,
            Apassword: passwordBcrypt,
            Astatus: 1
        })


        return res.status(200).json({
            message: `Administrador creado de manera Exitosa`
        })

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: `Error `
        })

    }

}




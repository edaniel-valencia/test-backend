import { Request, Response } from "express";
import { User } from "../models/user";
import { Category } from "../models/category";
import * as XLSX from "xlsx";


export const ReadUserPublic = async (req: Request, res: Response) => {

    const listUser = await User.findAll();
    res.json(
        listUser
    );
}

export const ReadUserAll = async (req: Request, res: Response) => {

    const {categoryId} = req.params

   try {

    const listUser = await User.findAll({
        include: [{
            model: Category, 
            as: 'categories'
        }]
    });


    if(listUser.length === 0){
        return res.status(404).json({message: "No se han encontrado usuarios"})
    }
    res.json(listUser);


   } catch (error) {
    return res.status(500).json({message: "Error al encontrado usuarios", error})

   }
}

export const ReadUserAllId = async (req: Request, res: Response) => {

    const {categoryId} = req.params

   try {

    const listUser = await User.findAll({
        where: {CategoryId:  categoryId},
        include: [{
            model: Category, 
            as: 'categories'
        }]
    });


    if(listUser.length === 0){
        return res.status(404).json({message: "No se han encontrado usuarios"})
    }
    res.json(listUser);


   } catch (error) {
    return res.status(500).json({message: "Error al encontrado usuarios", error})

   }
}

export const CargarDatosOfExcel = async (req: Request, res: Response) => {

    try {
      
        if(!req.file){
            return res.status(400).json({ error: 'No se ha subido ningun archivo' });
        }

        const fileBuffer = req.file.buffer
        const workBook = XLSX.read(fileBuffer, {type: "buffer"})

        const workSheet = workBook.Sheets[workBook.SheetNames[0]]

        const data: any[] = XLSX.utils.sheet_to_json(workSheet, {header: 1})

        const users = data.slice(1).map((row) => ({
            Uname: row[0],
            Ulastname: row[1],
            Uemail: row[2],
            Uwhatsapp: row[3],
            CategoryId: row[4],
            Ustatus: 1
        }))

        await User.bulkCreate(users)
        

        res.status(200).json({ message: 'Mensaje enviado exitosamente' });

    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}


export const CreateUser = async (req: Request, res: Response) => {
    
    const { Uname, Ulastname, Uemail, Uwhatsapp, CategoryId } = req.body
    console.log(req.body);
    
    try {
        User.create({
            Uname: Uname,
            Ulastname: Ulastname,
            Uemail: Uemail,
            Uwhatsapp: Uwhatsapp,
            CategoryId: CategoryId,
            Ustatus: 1,
        })

        res.status(200).json({ message: 'Usuario creado exitosamente' });

    } catch (error) {

        console.log("Error al crear el usuario: ", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

export const UpdateUser = async (req: Request, res: Response) => {

    const { Uid } = req.params
    const { Uname, Ulastname, Uemail, Uwhatsapp, CategoryId, Ustatus} = req.body

    const user = await User.findOne({where: {Uid: Uid}})
    
    if(!user){
        res.status(404).json(`No se ha encontrado el usuarios ${Uid} con ${Uemail} `)
    }

    try {
        User.update({
            Uname: Uname,
            Ulastname: Ulastname,
            Uemail: Uemail,
            Uwhatsapp: Uwhatsapp,
            CategoryId: CategoryId,

            Ustatus: Ustatus,
        },{
            where: {Uid: Uid}
        })


        res.status(200).json({ message: 'Usuario actualizado exitosamente' });

    } catch (error) {

        console.log("Error al actualizar el usuario: ", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

export const DeleteUser = async (req: Request, res: Response) => {

    const { Uid } = req.params
    
    const user = await User.findOne({where: {Uid: Uid}})

    if(!user){
        res.status(404).json(`No se ha encontrado el usuarios ${Uid}  `)
    }

    try {
        User.destroy({where: {Uid: Uid}
        })


        res.status(200).json({ message: 'Usuario eliminado exitosamente'});

    } catch (error) {

        console.log("Error al eliminar el usuario: ", error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

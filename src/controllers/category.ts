import { Request, Response } from "express";
import { User } from "../models/user";
import { Category } from "../models/category";
import * as XLSX from "xlsx";
import { where } from "sequelize";



export const ReadCategoryAll = async (req: Request, res: Response) => {


   try {

    const listCategory = await Category.findAll({});


    if(listCategory.length === 0){
        return res.status(404).json({message: "No se han encontrado usuarios"})
    }
    res.json(listCategory);


   } catch (error) {
    return res.status(500).json({message: "Error al encontrado usuarios", error})

   }
}




export const CreateCategory = async (req: Request, res: Response) => {
    
    const { Cname } = req.body
    console.log(req.body);
    
    try {
        Category.create({
            Cname: Cname,           
            Cstatus: 1,
        })

        res.status(200).json({ message: 'Categoria creado exitosamente' });

    } catch (error) {

        console.log("Error al crear el Categoria: ", error);
        res.status(500).json({ error: 'Error al crear el Categoria' });
    }
}


export const UpdateCategory = async (req: Request, res: Response) => {
    
    const {Cid} = req.params
    const { Cname, Cstatus } = req.body

    const category: any = await Category.findOne({ where: { Cid: Cid } });

    if (!category) {
        return res.status(400).json({
            message: `No existe el usuario ${Cname}`
        });
    }
    
    console.log(req.body);
    
    try {
        Category.update({
            Cname: Cname,           
            Cstatus: Cstatus,
        },{where: {Cid: Cid}})

        res.status(200).json({ message: 'Categoria creado exitosamente' });

    } catch (error) {

        console.log("Error al crear el Categoria: ", error);
        res.status(500).json({ error: 'Error al crear el Categoria' });
    }
}




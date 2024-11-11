import { Request, Response } from "express";
import { Marketing } from "../models/marketing";



export const Read = async (req: Request, res: Response) => {


   try {

    const listMarketing = await Marketing.findAll({});


    if(listMarketing.length === 0){
        return res.status(404).json({message: "No se han encontrado mensaje"})
    }
    res.json(listMarketing);


   } catch (error) {
    return res.status(500).json({message: "Error al encontrado usuarios", error})

   }
}



export const DeleteMarketing = async (req: Request, res: Response) => {

    const { Mid } = req.params
    
    const marketing = await Marketing.findOne({where: {Mid: Mid}})

    if(!marketing){
        res.status(404).json(`No se ha encontrado el campaña ${Mid}  `)
    }

    try {
       Marketing.destroy({where: {Mid: Mid}
        })
        res.status(200).json({ message: 'Camapaña eliminado exitosamente'});

    } catch (error) {

        console.log("Error al eliminar la Camapaña: ", error);
        res.status(500).json({ error: 'Error al eliminar la Camapaña' });
    }
}





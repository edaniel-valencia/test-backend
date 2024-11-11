import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


const validateToken = (req: Request, res: Response, next: NextFunction) =>{
    const headerToken = req.headers['authorization']
    
    console.log(headerToken)

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        try {
            const token = headerToken.slice(7);
            jwt.verify(token, process.env.SECRET_KEY || 'Edaniel-Valencia')
            next()
        
        } catch (error) {
            res.status(401).json({
                message: `CIERRE DE SSISION AUTOMANITCA`
            })          
        }
    }else{
        res.status(401).json({
            message: `ACCESO DENEGADO`
        })
    }
}

export default validateToken
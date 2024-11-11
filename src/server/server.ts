import express, {Application, json, urlencoded} from 'express'

import routerEmail from "../routes/email"
import routerUser from "../routes/user"
import routerCategory from "../routes/category"
import routerConfig from "../routes/config"
import routerMarketing from "../routes/marketing"
import routerAdmin from "../routes/admin"
import path from 'path';

import cors from 'cors'
import { User } from '../models/user'
import { Category } from '../models/category';
import { Config } from '../models/config'
import { Marketing } from '../models/marketing'
import { Admin } from '../models/admin'

class Server {

    private app: Application
    private port: string
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3002'
        this.listen();
        this.midlewares();
        this.router();
        this.conexionDB();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Estoy ejecuntado en el puerto: " + this.port);        
        })
    }

    router(){
        this.app.use(routerEmail)
        this.app.use(routerUser)
        this.app.use(routerCategory)
        this.app.use(routerConfig)
        this.app.use(routerMarketing)
        this.app.use(routerAdmin)
        
    }


    async conexionDB(){
        try {

            
            await Marketing.sync()
            await Category.sync()
            await Admin.sync()

            await User.sync()
            await Config.sync()

            console.log("Conexion Exitosa");

        } catch (error) {
            console.log("Error de conexion"+ error);            
        }
    }

    midlewares(){
        this.app.use('/assets', express.static(path.resolve('assets')));

        this.app.use(express.json())
        this.app.use(urlencoded({extended: true}))
        this.app.use(json())

        //
        this.app.use(cors())
        
    }
}


export default Server
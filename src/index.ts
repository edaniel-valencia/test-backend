import dotenv from 'dotenv'
import Server from './server/server'



dotenv.config() 
const server =  new Server()


export default server


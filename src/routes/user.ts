import { Router } from "express";
import { CargarDatosOfExcel, CreateUser, DeleteUser, ReadUserAll, ReadUserAllId, UpdateUser,  } from "../controllers/user";
import multer from "multer";
import { storage } from '../midlewares/storage';
import validateToken from "../midlewares/token";


const router = Router();
const upload = multer({ storage });

router.get("/api/user/readAll/", validateToken, ReadUserAll)
router.get("/api/user/readAllId/:categoryId", validateToken, ReadUserAllId)


router.post('/api/user/createUserFile', upload.single('excel'), validateToken, CargarDatosOfExcel);


//CRUD
router.post('/api/user/create', validateToken, CreateUser);
router.patch('/api/user/update/:Uid', validateToken, UpdateUser);
router.delete('/api/user/delete/:Uid', validateToken, DeleteUser);


export default router
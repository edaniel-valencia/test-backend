import { Router } from "express";
import { ReadUserAll, ReadUserAllId,  } from "../controllers/user";
import multer from "multer";
import { storage } from '../midlewares/storage';
import { CreateCategory, ReadCategoryAll, UpdateCategory } from "../controllers/category";
import validateToken from "../midlewares/token";


const router = Router();
const upload = multer({ storage });

router.get("/api/category/readAll/", validateToken, ReadCategoryAll)


//CRUD
router.post('/api/category/create', validateToken, CreateCategory);
router.patch('/api/category/update/:Cid', validateToken, UpdateCategory);
// router.delete('/api/category/delete/:Uid', validateToken, DeleteCategory);



export default router
import { Router } from "express";
import { DeleteMarketing, Read } from "../controllers/marketing";
import validateToken from "../midlewares/token";

const router = Router();

router.get("/api/marketing/readAll/", validateToken, Read)


router.delete('/api/marketing/delete/:Mid', validateToken, DeleteMarketing);


export default router
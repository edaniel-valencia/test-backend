import { Router } from "express";
import { Auth, Register } from "../controllers/admin";


const router = Router();

router.post('/api/admin/auth', Auth);
router.post('/api/admin/register', Register);


export default router
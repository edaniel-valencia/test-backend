import { Router } from "express";
import { Create, Delete, Read, Update } from "../controllers/config";
import validateToken from "../midlewares/token";

const router = Router();

router.post("/api/config/create", validateToken, Create)
router.get("/api/config/read", validateToken, Read)
router.patch("/api/config/update/:Cid",validateToken, Update)
router.delete("/api/config/delete/:Cid",validateToken, Delete)

export default router
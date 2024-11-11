import { Router } from "express";
import { SendEmail, SendEmailMasive, sendMasiveByCategory } from "../controllers/email";
import { storage } from '../midlewares/storage';
import multer from 'multer';
import validateToken from "../midlewares/token";

const router = Router();
const upload = multer({ storage });

router.post("/api/email/send", validateToken, SendEmail)
router.post('/api/email/sendMasive', upload.single('image'), validateToken, SendEmailMasive);
router.post('/api/email/sendMasiveByCategory/:Cid', upload.single('image'), validateToken, sendMasiveByCategory);

export default router
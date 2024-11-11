"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../controllers/email");
const storage_1 = require("../midlewares/storage");
const multer_1 = __importDefault(require("multer"));
const token_1 = __importDefault(require("../midlewares/token"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage_1.storage });
router.post("/api/email/send", token_1.default, email_1.SendEmail);
router.post('/api/email/sendMasive', upload.single('image'), token_1.default, email_1.SendEmailMasive);
router.post('/api/email/sendMasiveByCategory/:Cid', upload.single('image'), token_1.default, email_1.sendMasiveByCategory);
exports.default = router;

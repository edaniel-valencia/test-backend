"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../midlewares/storage");
const token_1 = __importDefault(require("../midlewares/token"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage_1.storage });
router.get("/api/user/readAll/", token_1.default, user_1.ReadUserAll);
router.get("/api/user/readAllId/:categoryId", token_1.default, user_1.ReadUserAllId);
router.post('/api/user/createUserFile', upload.single('excel'), token_1.default, user_1.CargarDatosOfExcel);
//CRUD
router.post('/api/user/create', token_1.default, user_1.CreateUser);
router.patch('/api/user/update/:Uid', token_1.default, user_1.UpdateUser);
router.delete('/api/user/delete/:Uid', token_1.default, user_1.DeleteUser);
exports.default = router;

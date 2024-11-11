"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../midlewares/storage");
const category_1 = require("../controllers/category");
const token_1 = __importDefault(require("../midlewares/token"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage_1.storage });
router.get("/api/category/readAll/", token_1.default, category_1.ReadCategoryAll);
//CRUD
router.post('/api/category/create', token_1.default, category_1.CreateCategory);
router.patch('/api/category/update/:Cid', token_1.default, category_1.UpdateCategory);
// router.delete('/api/category/delete/:Uid', validateToken, DeleteCategory);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketing_1 = require("../controllers/marketing");
const token_1 = __importDefault(require("../midlewares/token"));
const router = (0, express_1.Router)();
router.get("/api/marketing/readAll/", token_1.default, marketing_1.Read);
router.delete('/api/marketing/delete/:Mid', token_1.default, marketing_1.DeleteMarketing);
exports.default = router;

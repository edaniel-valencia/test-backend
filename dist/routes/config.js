"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../controllers/config");
const token_1 = __importDefault(require("../midlewares/token"));
const router = (0, express_1.Router)();
router.post("/api/config/create", token_1.default, config_1.Create);
router.get("/api/config/read", token_1.default, config_1.Read);
router.patch("/api/config/update/:Cid", token_1.default, config_1.Update);
router.delete("/api/config/delete/:Cid", token_1.default, config_1.Delete);
exports.default = router;

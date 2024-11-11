"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
router.post('/api/admin/auth', admin_1.Auth);
router.post('/api/admin/register', admin_1.Register);
exports.default = router;

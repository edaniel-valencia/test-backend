"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const email_1 = __importDefault(require("../routes/email"));
const user_1 = __importDefault(require("../routes/user"));
const category_1 = __importDefault(require("../routes/category"));
const config_1 = __importDefault(require("../routes/config"));
const marketing_1 = __importDefault(require("../routes/marketing"));
const admin_1 = __importDefault(require("../routes/admin"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const user_2 = require("../models/user");
const category_2 = require("../models/category");
const config_2 = require("../models/config");
const marketing_2 = require("../models/marketing");
const admin_2 = require("../models/admin");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3002';
        this.listen();
        this.midlewares();
        this.router();
        this.conexionDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Estoy ejecuntado en el puerto: " + this.port);
        });
    }
    router() {
        this.app.use(email_1.default);
        this.app.use(user_1.default);
        this.app.use(category_1.default);
        this.app.use(config_1.default);
        this.app.use(marketing_1.default);
        this.app.use(admin_1.default);
    }
    conexionDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield marketing_2.Marketing.sync();
                yield category_2.Category.sync();
                yield admin_2.Admin.sync();
                yield user_2.User.sync();
                yield config_2.Config.sync();
                console.log("Conexion Exitosa");
            }
            catch (error) {
                console.log("Error de conexion" + error);
            }
        });
    }
    midlewares() {
        this.app.use('/assets', express_1.default.static(path_1.default.resolve('assets')));
        this.app.use(express_1.default.json());
        this.app.use((0, express_1.urlencoded)({ extended: true }));
        this.app.use((0, express_1.json)());
        //
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;

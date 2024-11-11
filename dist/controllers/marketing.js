"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMarketing = exports.Read = void 0;
const marketing_1 = require("../models/marketing");
const Read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listMarketing = yield marketing_1.Marketing.findAll({});
        if (listMarketing.length === 0) {
            return res.status(404).json({ message: "No se han encontrado mensaje" });
        }
        res.json(listMarketing);
    }
    catch (error) {
        return res.status(500).json({ message: "Error al encontrado usuarios", error });
    }
});
exports.Read = Read;
const DeleteMarketing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Mid } = req.params;
    const marketing = yield marketing_1.Marketing.findOne({ where: { Mid: Mid } });
    if (!marketing) {
        res.status(404).json(`No se ha encontrado el campaña ${Mid}  `);
    }
    try {
        marketing_1.Marketing.destroy({ where: { Mid: Mid }
        });
        res.status(200).json({ message: 'Camapaña eliminado exitosamente' });
    }
    catch (error) {
        console.log("Error al eliminar la Camapaña: ", error);
        res.status(500).json({ error: 'Error al eliminar la Camapaña' });
    }
});
exports.DeleteMarketing = DeleteMarketing;

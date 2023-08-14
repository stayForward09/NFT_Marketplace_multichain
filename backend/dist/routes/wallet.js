"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var wallet_1 = __importDefault(require("../controllers/wallet"));
// Admin Panel
router.post('/', wallet_1.default.getData);
router.post('/add-event', wallet_1.default.addEvent);
router.post('/update-event', wallet_1.default.updateEvent);
router.post('/delete-event', wallet_1.default.deleteEvent);
exports.default = router;

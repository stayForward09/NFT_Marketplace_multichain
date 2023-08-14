"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var setting_1 = __importDefault(require("../controllers/setting"));
// User Panel
router.get('/key/:key', setting_1.default.getSetting); // key
// Admin Panel
router.post('/', setting_1.default.getData);
router.post('/add-event', setting_1.default.addEvent);
router.post('/update-event', setting_1.default.updateEvent);
router.post('/delete-event', setting_1.default.deleteEvent);
exports.default = router;

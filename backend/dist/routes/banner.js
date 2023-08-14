"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var banner_1 = __importDefault(require("../controllers/banner"));
// User Panel
router.get('/', banner_1.default.getBanners); // with status = 1
// Admin Panel
router.post('/', banner_1.default.getData);
router.post('/add-event', banner_1.default.addEvent);
router.post('/update-event', banner_1.default.updateEvent);
router.post('/delete-event', banner_1.default.deleteEvent);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var hashlist_1 = __importDefault(require("../controllers/hashlist"));
// Admin Panel
router.post('/', hashlist_1.default.getData);
router.post('/add-event', hashlist_1.default.addEvent);
router.post('/update-event', hashlist_1.default.updateEvent);
router.post('/delete-event', hashlist_1.default.deleteEvent);
exports.default = router;

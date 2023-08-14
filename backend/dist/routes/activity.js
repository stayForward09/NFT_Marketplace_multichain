"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var activity_1 = __importDefault(require("../controllers/activity"));
// User Panel
router.post('/wallet', activity_1.default.getMyActivities); // walletAddress
router.post('/nft', activity_1.default.getNftActivities); // mintAddress
router.post('/collection', activity_1.default.getCollectionActivities); // symbol
// Admin Panel
router.post('/', activity_1.default.getData);
router.post('/add-event', activity_1.default.addEvent);
router.post('/update-event', activity_1.default.updateEvent);
router.post('/delete-event', activity_1.default.deleteEvent);
exports.default = router;

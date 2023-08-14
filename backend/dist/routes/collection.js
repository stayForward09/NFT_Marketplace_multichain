"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var collection_1 = __importDefault(require("../controllers/collection"));
// User Panel
router.get('/popular', collection_1.default.getPopularCollections); // with isPopular = true
router.get('/', collection_1.default.getAllCollections); // with status = 1
router.get('/all', collection_1.default.getAllCollections); // with status = 1
router.post('/symbol', collection_1.default.getCollectionBySymbol); // with status = 1, symbol
// Admin Panel
router.post('/', collection_1.default.getData);
router.post('/add-event', collection_1.default.addEvent);
router.post('/update-event', collection_1.default.updateEvent);
router.post('/delete-event', collection_1.default.deleteEvent);
router.post('/approve-event', collection_1.default.approveEvent);
router.post('/reject-event', collection_1.default.rejectEvent);
exports.default = router;

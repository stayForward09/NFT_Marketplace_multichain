"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var bid_1 = __importDefault(require("../controllers/bid"));
// User Panel
router.get('/nft/:mintAddress', bid_1.default.getBidByNFT); // mintAddress
router.post('/wallet', bid_1.default.getBidsByWallet); // walletAddress
router.post('/receive', bid_1.default.getReceivedBids); // walletAddress
router.post('/nft', bid_1.default.getBidsByNFT); // mintAddress
router.post('/make', bid_1.default.makeBid);
router.post('/update', bid_1.default.updateBid);
router.post('/calcel', bid_1.default.cancelBid);
router.post('/accept', bid_1.default.acceptBid);
router.post('/makeTx', bid_1.default.makeBidTransaction);
router.post('/updateTx', bid_1.default.updateBidTransaction);
router.post('/calcelTx', bid_1.default.cancelBidTransaction);
router.post('/acceptTx', bid_1.default.acceptBidTransaction);
// Admin Panel
router.post('/', bid_1.default.getData);
router.post('/add-event', bid_1.default.addEvent);
router.post('/update-event', bid_1.default.updateEvent);
router.post('/delete-event', bid_1.default.deleteEvent);
exports.default = router;

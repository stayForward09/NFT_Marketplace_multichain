"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var nft_1 = __importDefault(require("../controllers/nft"));
// User Panel
router.post('/wallet', nft_1.default.getNftByWalletAddress); // walletAddress
router.get('/wallet/:walletAddress/:status', nft_1.default.getNftByWalletAddress); // walletAddress
router.get('/item/:mintAddress', nft_1.default.getNftByMintAddress); // mintAddress
router.post('/buy', nft_1.default.buyNft);
router.post('/list', nft_1.default.listNft);
router.post('/unlist', nft_1.default.unlistNft);
router.post('/update', nft_1.default.updateNft);
router.post('/buyTx', nft_1.default.buyNftTransaction);
router.post('/listTx', nft_1.default.listNftTransaction);
router.post('/unlistTx', nft_1.default.unlistNftTransaction);
router.post('/updateListTx', nft_1.default.updateNftTransaction);
// Admin Panel
router.post('/', nft_1.default.getData);
router.post('/add-event', nft_1.default.addEvent);
router.post('/update-event', nft_1.default.updateEvent);
router.post('/delete-event', nft_1.default.deleteEvent);
exports.default = router;

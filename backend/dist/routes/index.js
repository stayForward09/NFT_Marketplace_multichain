"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var jwt_1 = __importDefault(require("./jwt"));
var activity_1 = __importDefault(require("./activity"));
var banner_1 = __importDefault(require("./banner"));
var bid_1 = __importDefault(require("./bid"));
var collection_1 = __importDefault(require("./collection"));
var hashlist_1 = __importDefault(require("./hashlist"));
var nft_1 = __importDefault(require("./nft"));
var setting_1 = __importDefault(require("./setting"));
var wallet_1 = __importDefault(require("./wallet"));
// Backend Test
router.get('/test', function (req, res) {
    return res.send('OK');
});
router.use('/jwt', jwt_1.default);
router.use('/activity', activity_1.default);
router.use('/banner', banner_1.default);
router.use('/bid', bid_1.default);
router.use('/collection', collection_1.default);
router.use('/hashlist', hashlist_1.default);
router.use('/nft', nft_1.default);
router.use('/setting', setting_1.default);
router.use('/wallet', wallet_1.default);
exports.default = router;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bid_1 = __importDefault(require("../services/bid"));
var activity_1 = __importDefault(require("../services/activity"));
var hashlist_1 = __importDefault(require("../services/hashlist"));
var nft_1 = __importDefault(require("../services/nft"));
var wallet_1 = __importDefault(require("../services/wallet"));
var config_1 = require("../config");
var constants_1 = require("../constants");
var sequelize_1 = __importDefault(require("sequelize"));
var Op = sequelize_1.default.Op;
var bs58_1 = __importDefault(require("bs58"));
var sol_rayz_1 = require("@nfteyez/sol-rayz");
var contract_1 = require("../helpers/contract");
var web3_js_1 = require("@solana/web3.js");
var solana_1 = require("../helpers/solana");
var solanaClient = new solana_1.SolanaClient({ rpcEndpoint: config_1.CLUSTER_API });
var connection = new web3_js_1.Connection(config_1.CLUSTER_API, 'confirmed');
// User Panel
var getBidByNFT = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mintAddress, condition, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mintAddress = req.params.mintAddress;
                if (mintAddress === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: {
                        mintAddress: mintAddress,
                        status: 1
                    }
                };
                return [4 /*yield*/, bid_1.default.findOne(condition)];
            case 1:
                result = _a.sent();
                res.status(200).json({ success: true, data: result, message: 'Success' });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getBidsByWallet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAddress, limit, currentPage, condition, result, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletAddress = _a.walletAddress, limit = _a.limit, currentPage = _a.currentPage;
                if (walletAddress === undefined || limit === undefined || currentPage === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: {
                        walletAddress: walletAddress,
                        // status: 1
                    },
                    order: [['updated_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, bid_1.default.findAndCountAll(condition)];
            case 1:
                result = _b.sent();
                res.status(200).json({ success: true, data: result, message: 'Success' });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getReceivedBids = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAddress, limit, currentPage, filters_1, listedNFTs, condition, result, err_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, walletAddress = _a.walletAddress, limit = _a.limit, currentPage = _a.currentPage;
                if (walletAddress === undefined || limit === undefined || currentPage === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                filters_1 = (_b = {},
                    _b[Op.or] = [],
                    _b);
                return [4 /*yield*/, nft_1.default.findAll({ walletAddress: walletAddress })];
            case 1:
                listedNFTs = _c.sent();
                listedNFTs.map(function (nft, index) {
                    filters_1[Op.or].push({
                        mintAddress: "".concat(nft.mintAddress)
                    });
                });
                condition = {
                    where: __assign(__assign({}, filters_1), { status: 1 }),
                    order: [['updated_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, bid_1.default.findAndCountAll(condition)];
            case 2:
                result = _c.sent();
                res.status(200).json({ success: true, data: result, message: 'Success' });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _c.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getBidsByNFT = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, limit, currentPage, condition, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, mintAddress = _a.mintAddress, limit = _a.limit, currentPage = _a.currentPage;
                if (mintAddress === undefined || limit === undefined || currentPage === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: {
                        mintAddress: mintAddress,
                        status: 1
                    },
                    order: [['updated_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, bid_1.default.findAndCountAll(condition)];
            case 1:
                result = _b.sent();
                res.status(200).json({ success: true, data: result, message: 'Success' });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Make Bid Nft
var makeBid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, offerPrice, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, oldBid, bidResult, data, data, condition, activity, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 15, , 16]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, offerPrice = _a.offerPrice, signature = _a.signature;
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 1:
                parsedTxn = _b.sent();
                if (!parsedTxn.meta) {
                    throw 'Transaction Error';
                }
                if (parsedTxn.meta.err !== null) {
                    throw 'Transaction Error';
                }
                programId = parsedTxn.transaction.message.instructions[0].programId.toString();
                if (programId !== config_1.PROGRAM_ID) {
                    throw 'Tranaction Error';
                }
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: CreateBid') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 2:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 3:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 4:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 5:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 6:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 7:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 8:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                if (nftResult.tokenAccount !== nftInfo.pubkey) {
                    // Cancel list logic
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                        }
                    })];
            case 9:
                oldBid = _b.sent();
                bidResult = void 0;
                if (!(oldBid === null)) return [3 /*break*/, 11];
                data = {
                    image: accountInfo.image,
                    name: accountInfo.name,
                    mintAddress: mintAddress,
                    tokenAccount: nftInfo.pubkey,
                    walletAddress: bidderAddress,
                    offerPrice: offerPrice,
                    currentPrice: nftResult.price,
                    status: 1
                };
                return [4 /*yield*/, bid_1.default.create(data)];
            case 10:
                bidResult = _b.sent();
                return [3 /*break*/, 13];
            case 11:
                if (!(oldBid.status === 2)) return [3 /*break*/, 13];
                data = {
                    tokenAccount: nftInfo.pubkey,
                    walletAddress: bidderAddress,
                    offerPrice: offerPrice,
                    currentPrice: nftResult.price,
                    status: 1
                };
                condition = {
                    where: {
                        mintAddress: mintAddress,
                        walletAddress: bidderAddress
                    },
                    returning: true,
                    plain: true
                };
                return [4 /*yield*/, nft_1.default.update(data, condition)[1].dataValues];
            case 12:
                bidResult = _b.sent();
                _b.label = 13;
            case 13:
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    image: accountInfo.image,
                    name: accountInfo.name,
                    type: constants_1.ACTIVITY_TYPE.PLACED_BID,
                    price: offerPrice,
                    from: bidderAddress,
                    to: owner,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 14:
                _b.sent();
                res.status(200).json({ success: true, data: bidResult, message: 'Success' });
                return [3 /*break*/, 16];
            case 15:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 16: return [2 /*return*/];
        }
    });
}); };
var updateBid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, offerPrice, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, activity, bidResult, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, offerPrice = _a.offerPrice, signature = _a.signature;
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 1:
                parsedTxn = _b.sent();
                if (!parsedTxn.meta) {
                    throw 'Transaction Error';
                }
                if (parsedTxn.meta.err !== null) {
                    throw 'Transaction Error';
                }
                programId = parsedTxn.transaction.message.instructions[0].programId.toString();
                if (programId !== config_1.PROGRAM_ID) {
                    throw 'Tranaction Error';
                }
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: UpdateBid') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 2:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 3:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 4:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 5:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 6:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 7:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                            status: 1
                        }
                    })];
            case 8:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.UPDATE_BID,
                    price: offerPrice,
                    from: bidderAddress,
                    to: nftResult.walletAddress,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 9:
                _b.sent();
                return [4 /*yield*/, bid_1.default.update({ offerPrice: offerPrice }, { where: { mintAddress: mintAddress, walletAddress: bidderAddress }, returning: true, plain: true })];
            case 10:
                bidResult = _b.sent();
                res.status(200).json({ success: true, data: bidResult[1].dataValues, message: 'Success' });
                return [3 /*break*/, 12];
            case 11:
                err_6 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 12: return [2 /*return*/];
        }
    });
}); };
var cancelBid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, bidResult, activity, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, signature = _a.signature;
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 1:
                parsedTxn = _b.sent();
                if (!parsedTxn.meta) {
                    throw 'Transaction Error';
                }
                if (parsedTxn.meta.err !== null) {
                    throw 'Transaction Error';
                }
                programId = parsedTxn.transaction.message.instructions[0].programId.toString();
                if (programId !== config_1.PROGRAM_ID) {
                    throw 'Tranaction Error';
                }
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: CancelBid') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 2:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 3:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 4:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 5:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 6:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress
                        }
                    })];
            case 7:
                nftResult = _b.sent();
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                            status: 1
                        }
                    })];
            case 8:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                return [4 /*yield*/, bid_1.default.update({ status: 2 }, { where: { mintAddress: mintAddress, walletAddress: bidderAddress }, returning: true, plain: true })];
            case 9:
                bidResult = _b.sent();
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.CANCEL_BID,
                    price: bidResult[1].dataValues.offerPrice,
                    from: bidderAddress,
                    to: nftResult.walletAddress,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 10:
                _b.sent();
                res.status(200).json({ success: true, data: bidResult[1].dataValues, message: 'Success' });
                return [3 /*break*/, 12];
            case 11:
                err_7 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 12: return [2 /*return*/];
        }
    });
}); };
var acceptBid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, bidResult, activity, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, signature = _a.signature;
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 1:
                parsedTxn = _b.sent();
                if (!parsedTxn.meta) {
                    throw 'Transaction Error';
                }
                if (parsedTxn.meta.err !== null) {
                    throw 'Transaction Error';
                }
                programId = parsedTxn.transaction.message.instructions[0].programId.toString();
                if (programId !== config_1.PROGRAM_ID) {
                    throw 'Tranaction Error';
                }
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: AcceptBid') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 2:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 3:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 4:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 5:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 6:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 7:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                            status: 1
                        }
                    })];
            case 8:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                return [4 /*yield*/, bid_1.default.update({ status: 2 }, { where: { mintAddress: mintAddress, walletAddress: bidderAddress }, returning: true, plain: true })];
            case 9:
                bidResult = _b.sent();
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.ACCEPT_BID,
                    price: bidResult[1].dataValues.offerPrice,
                    from: bidderAddress,
                    to: nftResult.walletAddress,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 10:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: bidResult[1].dataValues, message: 'Success' })];
            case 11:
                err_8 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 12: return [2 /*return*/];
        }
    });
}); };
// Make Transaction
var makeBidTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, offerPrice, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, walletResult, vault, encodedKey, tx, seqTx, err_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, offerPrice = _a.offerPrice;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 1:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 2:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 3:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 4:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 5:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, wallet_1.default.findOne({ where: { walletAddress: bidderAddress } })];
            case 6:
                walletResult = _b.sent();
                vault = void 0;
                if (!(walletResult === null)) return [3 /*break*/, 8];
                vault = new web3_js_1.Keypair();
                encodedKey = bs58_1.default.encode(vault.secretKey);
                return [4 /*yield*/, wallet_1.default.create({
                        walletAddress: bidderAddress,
                        vault: encodedKey
                    })];
            case 7:
                _b.sent();
                return [3 /*break*/, 9];
            case 8:
                vault = bs58_1.default.decode(walletResult.vault);
                _b.label = 9;
            case 9: return [4 /*yield*/, (0, contract_1.makeBidTx)(offerPrice, {
                    bidder: new web3_js_1.PublicKey(bidderAddress),
                    seller: new web3_js_1.PublicKey(nftResult.walletAddress),
                    mint: new web3_js_1.PublicKey(mintAddress),
                    tokenAccount: new web3_js_1.PublicKey(nftResult.tokenAccount),
                    vault: web3_js_1.Keypair.fromSecretKey(vault),
                })];
            case 10:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.status(200).json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 11:
                err_9 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 12: return [2 /*return*/];
        }
    });
}); };
var updateBidTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, offerPrice, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, walletResult, vault, tx, seqTx, err_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress, offerPrice = _a.offerPrice;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 1:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 2:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 3:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 4:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 5:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                            status: 1
                        }
                    })];
            case 6:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                return [4 /*yield*/, wallet_1.default.findOne({ where: { walletAddress: bidderAddress } })];
            case 7:
                walletResult = _b.sent();
                vault = void 0;
                if (walletResult === null) {
                    throw 'Bad Request!';
                }
                vault = bs58_1.default.decode(walletResult.vault);
                return [4 /*yield*/, (0, contract_1.makeUpdateBidTx)(offerPrice, {
                        bidder: new web3_js_1.PublicKey(bidderAddress),
                        seller: new web3_js_1.PublicKey(nftResult.walletAddress),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftResult.tokenAccount),
                        vault: web3_js_1.Keypair.fromSecretKey(vault),
                    })];
            case 8:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.status(200).json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 9:
                err_10 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 10: return [2 /*return*/];
        }
    });
}); };
var cancelBidTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, walletResult, vault, tx, seqTx, err_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 1:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 2:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 3:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 4:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress
                        }
                    })];
            case 5:
                nftResult = _b.sent();
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress
                        }
                    })];
            case 6:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                return [4 /*yield*/, wallet_1.default.findOne({ where: { walletAddress: bidderAddress } })];
            case 7:
                walletResult = _b.sent();
                vault = void 0;
                if (walletResult === null) {
                    throw 'Bad Request!';
                }
                vault = bs58_1.default.decode(walletResult.vault);
                return [4 /*yield*/, (0, contract_1.makeCancelBidTx)({
                        bidder: new web3_js_1.PublicKey(bidderAddress),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftResult.tokenAccount),
                        vault: web3_js_1.Keypair.fromSecretKey(vault),
                    })];
            case 8:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.status(200).json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 9:
                err_11 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 10: return [2 /*return*/];
        }
    });
}); };
var acceptBidTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bidderAddress, mintAddress, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, oldBid, walletResult, vault, tx, seqTx, err_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, bidderAddress = _a.bidderAddress, mintAddress = _a.mintAddress;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: bidderAddress, connection: connection })];
            case 1:
                bidderAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 2:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 3:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 4:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            status: 1
                        }
                    })];
            case 5:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'nft is not listed';
                }
                return [4 /*yield*/, bid_1.default.findOne({
                        where: {
                            mintAddress: mintAddress,
                            walletAddress: bidderAddress,
                            status: 1
                        }
                    })];
            case 6:
                oldBid = _b.sent();
                if (oldBid === null) {
                    throw "".concat(bidderAddress, " does not bid to ").concat(mintAddress);
                }
                return [4 /*yield*/, wallet_1.default.findOne({ where: { walletAddress: bidderAddress } })];
            case 7:
                walletResult = _b.sent();
                vault = void 0;
                if (walletResult === null) {
                    throw 'Bad Request!';
                }
                vault = bs58_1.default.decode(walletResult.vault);
                return [4 /*yield*/, (0, contract_1.makeAcceptBidTx)({
                        seller: new web3_js_1.PublicKey(nftResult.walletAddress),
                        bidder: new web3_js_1.PublicKey(bidderAddress),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenFrom: new web3_js_1.PublicKey(nftResult.tokenAccount),
                        vault: web3_js_1.Keypair.fromSecretKey(vault),
                    })];
            case 8:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.status(200).json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 9:
                err_12 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 10: return [2 /*return*/];
        }
    });
}); };
// Admin Panel
var getData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, condition, result, e_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                params = req.body.params;
                if (params === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: (_a = {},
                        _a[Op.or] = [
                            {
                                key: (_b = {},
                                    _b[Op.like] = "%".concat(params.searchValue, "%"),
                                    _b)
                            },
                            {
                                value: (_c = {},
                                    _c[Op.like] = "%".concat(params.searchValue, "%"),
                                    _c)
                            }
                        ],
                        _a),
                    order: [[params.column, params.direction]],
                    limit: params.rowsPerPage,
                    offset: (params.currentPage - 1) * params.rowsPerPage
                };
                return [4 /*yield*/, bid_1.default.findAndCountAll(condition)];
            case 1:
                result = _d.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_1 = _d.sent();
                console.log('error: ', e_1);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body.data;
                if (data === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                delete data.id;
                return [4 /*yield*/, bid_1.default.create(data)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_2 = _a.sent();
                console.log('error: ', e_2);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body.data;
                if (data === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                return [4 /*yield*/, bid_1.default.update(data, { where: { id: data.id } })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (id === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                return [4 /*yield*/, bid_1.default.destroy({ where: { id: id } })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    // User Panel
    getBidsByWallet: getBidsByWallet,
    getBidByNFT: getBidByNFT,
    getBidsByNFT: getBidsByNFT,
    getReceivedBids: getReceivedBids,
    makeBid: makeBid,
    updateBid: updateBid,
    cancelBid: cancelBid,
    acceptBid: acceptBid,
    makeBidTransaction: makeBidTransaction,
    updateBidTransaction: updateBidTransaction,
    cancelBidTransaction: cancelBidTransaction,
    acceptBidTransaction: acceptBidTransaction,
    // Admin Panel
    getData: getData,
    addEvent: addEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};

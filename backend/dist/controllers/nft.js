"use strict";
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
var nft_1 = __importDefault(require("../services/nft"));
var activity_1 = __importDefault(require("../services/activity"));
var hashlist_1 = __importDefault(require("../services/hashlist"));
var config_1 = require("../config");
var constants_1 = require("../constants");
var sequelize_1 = __importDefault(require("sequelize"));
var Op = sequelize_1.default.Op;
var sol_rayz_1 = require("@nfteyez/sol-rayz");
var contract_1 = require("../helpers/contract");
var web3_js_1 = require("@solana/web3.js");
var solana_1 = require("../helpers/solana");
var solanaClient = new solana_1.SolanaClient({ rpcEndpoint: config_1.CLUSTER_API });
var connection = new web3_js_1.Connection(config_1.CLUSTER_API, 'confirmed');
// User Panel
var getNftByWalletAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAddress, status_1, condition, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params, walletAddress = _a.walletAddress, status_1 = _a.status;
                console.log('walletAddress', walletAddress);
                if (walletAddress === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: {
                        walletAddress: walletAddress,
                        status: status_1
                    }
                };
                return [4 /*yield*/, nft_1.default.findAll(condition)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getNftByMintAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mintAddress, condition, result, err_2;
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
                        mintAddress: mintAddress
                    }
                };
                return [4 /*yield*/, nft_1.default.findOne(condition)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var buyNft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, buyerAddress, mintAddress, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, activity, data, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, buyerAddress = _a.buyerAddress, mintAddress = _a.mintAddress, signature = _a.signature;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: buyerAddress, connection: connection })];
            case 1:
                buyerAddress = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 2:
                mintAddress = _b.sent();
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 3:
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
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: Buy') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 4:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
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
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.BUY,
                    price: nftResult.price,
                    from: buyerAddress,
                    to: nftResult.walletAddress,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 9:
                _b.sent();
                data = {
                    walletAddress: buyerAddress,
                    status: 3,
                };
                return [4 /*yield*/, nft_1.default.update(data, { where: { mintAddress: mintAddress }, returning: true, plain: true })];
            case 10:
                result = _b.sent();
                return [2 /*return*/, res.json({ success: true, data: result[1].dataValues, message: 'Success' })];
            case 11:
                err_3 = _b.sent();
                res.send(err_3);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
var listNft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, price, walletAddress, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, data, result, activity, activity, data, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 14, , 15]);
                _a = req.body, mintAddress = _a.mintAddress, price = _a.price, walletAddress = _a.walletAddress, signature = _a.signature;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })
                    // const signature = 'HCRM2YY6ejbdri6qJkjpeD84NuRFnzQusEeRaM3LUt2tAhXY3athgmwULRCXrKEmEDgdovusPdZp7yBXrtf66mQ'
                ];
            case 1:
                mintAddress = _b.sent();
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 2:
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
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: List') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 3:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 4:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 5:
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
            case 6:
                nftResult = _b.sent();
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 7:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                if (!(nftResult === null)) return [3 /*break*/, 10];
                data = {
                    mintAddress: mintAddress,
                    // walletAddress: owner,
                    walletAddress: walletAddress,
                    tokenAccount: nftInfo.pubkey,
                    collectionId: hash.collectionId,
                    name: accountInfo.name,
                    price: price,
                    image: accountInfo.image,
                    attributes: accountInfo.attributes,
                    status: 1,
                };
                return [4 /*yield*/, nft_1.default.create(data)];
            case 8:
                result = _b.sent();
                activity = {
                    collectionId: hash.collectionId,
                    mintAddress: mintAddress,
                    image: accountInfo.image,
                    name: accountInfo.name,
                    type: constants_1.ACTIVITY_TYPE.LIST,
                    price: price,
                    from: owner,
                    to: owner,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 9:
                _b.sent();
                return [2 /*return*/, res.json({ success: true, data: result[1].dataValues, message: 'Success' })];
            case 10:
                if (nftResult.status === 1) {
                    throw 'nft is already listed';
                }
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    image: accountInfo.image,
                    name: accountInfo.name,
                    type: constants_1.ACTIVITY_TYPE.LIST,
                    price: price,
                    from: walletAddress,
                    to: owner,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 11:
                _b.sent();
                data = {
                    price: price,
                    walletAddress: walletAddress,
                    tokenAccount: nftInfo.pubkey,
                    status: 1,
                };
                return [4 /*yield*/, nft_1.default.update(data, { where: { mintAddress: mintAddress }, returning: true, plain: true })];
            case 12:
                result = _b.sent();
                return [2 /*return*/, res.json({ success: true, data: result[1].dataValues, message: 'Success' })];
            case 13: return [3 /*break*/, 15];
            case 14:
                err_4 = _b.sent();
                res.send(err_4);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
var updateNft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, price, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, activity, data, result, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body, mintAddress = _a.mintAddress, price = _a.price, signature = _a.signature;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 1:
                mintAddress = _b.sent();
                return [4 /*yield*/, connection.getParsedTransaction(signature)];
            case 2:
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
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: UpdateList') {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, activity_1.default.findOne({
                        where: { signature: signature }
                    })];
            case 3:
                oldActivity = _b.sent();
                if (oldActivity !== null) {
                    throw 'Tranaction Error';
                }
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 4:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 5:
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
            case 6:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 7:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.UPDATE_LIST,
                    price: price,
                    from: owner,
                    to: owner,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 8:
                _b.sent();
                data = {
                    price: price,
                };
                return [4 /*yield*/, nft_1.default.update(data, { where: { mintAddress: mintAddress }, returning: true, plain: true })];
            case 9:
                result = _b.sent();
                return [2 /*return*/, res.json({ success: true, data: result[1].dataValues, message: 'Success' })];
            case 10:
                err_5 = _b.sent();
                res.send(err_5);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
var unlistNft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, signature, parsedTxn, programId, oldActivity, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, activity, data, result, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body, mintAddress = _a.mintAddress, signature = _a.signature;
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
                if (parsedTxn.meta.logMessages[1] !== 'Program log: Instruction: CancelList') {
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
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 3:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 4:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 5:
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
            case 6:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 7:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                activity = {
                    collectionId: nftResult.collectionId,
                    mintAddress: mintAddress,
                    name: accountInfo.name,
                    image: accountInfo.image,
                    type: constants_1.ACTIVITY_TYPE.UNLIST,
                    price: nftResult.price,
                    from: owner,
                    to: owner,
                    signature: signature,
                    status: 1,
                };
                return [4 /*yield*/, activity_1.default.create(activity)];
            case 8:
                _b.sent();
                data = {
                    status: 2,
                };
                return [4 /*yield*/, nft_1.default.update(data, { where: { mintAddress: mintAddress }, returning: true, plain: true })];
            case 9:
                result = _b.sent();
                return [2 /*return*/, res.json({ success: true, data: result[1].dataValues, message: 'Success' })];
            case 10:
                err_6 = _b.sent();
                res.send(err_6);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
var buyNftTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, buyerAddress, seller, mintAddress, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, tx, seqTx, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.body, buyerAddress = _a.buyerAddress, seller = _a.seller, mintAddress = _a.mintAddress;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: buyerAddress, connection: connection })];
            case 1:
                buyerAddress = _b.sent();
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
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 6:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                if (nftResult.tokenAccount !== nftInfo.pubkey.toString()) {
                    // Cancel list logic
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, (0, contract_1.makeBuyTx)({
                        buyer: new web3_js_1.PublicKey(buyerAddress),
                        seller: new web3_js_1.PublicKey(seller),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenFrom: new web3_js_1.PublicKey(nftResult.tokenAccount)
                    })];
            case 7:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 8:
                err_7 = _b.sent();
                res.send(err_7);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var listNftTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, price, accountInfo, nftNameArray, nftName, hash, validAddress, nftInfo, nftResult, tx, owner, seqTx, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body, mintAddress = _a.mintAddress, price = _a.price;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 1:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 2:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 3:
                hash = _b.sent();
                if (hash === null) {
                    throw 'Collection Validate Error';
                }
                validAddress = hash.hashlist.indexOf(mintAddress);
                if (validAddress === -1) {
                    throw 'Collection Validate Error';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 4:
                nftInfo = _b.sent();
                return [4 /*yield*/, nft_1.default.findOne({
                        where: {
                            mintAddress: mintAddress
                        }
                    })];
            case 5:
                nftResult = _b.sent();
                tx = void 0;
                owner = nftInfo.account.data.parsed.info.owner;
                if (!(nftResult === null)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, contract_1.makeListTx)(price, {
                        user: new web3_js_1.PublicKey(owner),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftInfo.pubkey)
                    })];
            case 6:
                tx = _b.sent();
                return [3 /*break*/, 9];
            case 7:
                if (nftResult.status === 1) {
                    throw 'nft is already listed';
                }
                return [4 /*yield*/, (0, contract_1.makeListTx)(price, {
                        user: new web3_js_1.PublicKey(owner),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftInfo.pubkey)
                    })];
            case 8:
                tx = _b.sent();
                _b.label = 9;
            case 9:
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                // let tx1: any = anchor.web3.Transaction.populate(anchor.web3.Message.from(seqTx));
                console.log('seqTx', tx);
                return [2 /*return*/, res.json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 10:
                err_8 = _b.sent();
                res.send(err_8);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
var updateNftTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, walletAddress, price, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, tx, seqTx, err_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, mintAddress = _a.mintAddress, walletAddress = _a.walletAddress, price = _a.price;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 1:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 2:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 3:
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
            case 4:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 5:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                return [4 /*yield*/, (0, contract_1.makeUpdateListTx)(price, {
                        user: new web3_js_1.PublicKey(walletAddress),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftInfo.pubkey)
                    })];
            case 6:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 7:
                err_9 = _b.sent();
                res.send(err_9);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var unlistNftTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAddress, mintAddress, accountInfo, nftNameArray, nftName, hash, validAddress, nftResult, nftInfo, owner, tx, seqTx, err_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, walletAddress = _a.walletAddress, mintAddress = _a.mintAddress;
                return [4 /*yield*/, (0, sol_rayz_1.resolveToWalletAddress)({ text: mintAddress, connection: connection })];
            case 1:
                mintAddress = _b.sent();
                return [4 /*yield*/, solanaClient.getCollectible(mintAddress)];
            case 2:
                accountInfo = _b.sent();
                nftNameArray = accountInfo.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                return [4 /*yield*/, hashlist_1.default.findOne({
                        where: {
                            nftName: nftName
                        }
                    })];
            case 3:
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
            case 4:
                nftResult = _b.sent();
                if (nftResult === null) {
                    throw 'NFT is not listed!';
                }
                return [4 /*yield*/, (0, sol_rayz_1.getParsedAccountByMint)({ mintAddress: mintAddress, connection: connection })];
            case 5:
                nftInfo = _b.sent();
                owner = nftInfo.account.data.parsed.info.owner;
                console.log('owner', owner.toString());
                console.log('tokenAccount', new web3_js_1.PublicKey(nftInfo.pubkey).toString());
                return [4 /*yield*/, (0, contract_1.makeCancelListTx)({
                        user: new web3_js_1.PublicKey(walletAddress),
                        mint: new web3_js_1.PublicKey(mintAddress),
                        tokenAccount: new web3_js_1.PublicKey(nftInfo.pubkey)
                    })];
            case 6:
                tx = _b.sent();
                seqTx = tx.serialize({ requireAllSignatures: false, verifySignatures: false });
                return [2 /*return*/, res.json({ success: true, data: { tx: seqTx }, message: 'Success' })];
            case 7:
                err_10 = _b.sent();
                res.send(err_10);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
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
                return [4 /*yield*/, nft_1.default.findAndCountAll(condition)];
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
                return [4 /*yield*/, nft_1.default.create(data)];
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
                return [4 /*yield*/, nft_1.default.update(data, { where: { id: data.id } })];
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
                return [4 /*yield*/, nft_1.default.destroy({ where: { id: id } })];
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
    getNftByWalletAddress: getNftByWalletAddress,
    getNftByMintAddress: getNftByMintAddress,
    buyNft: buyNft,
    listNft: listNft,
    unlistNft: unlistNft,
    updateNft: updateNft,
    buyNftTransaction: buyNftTransaction,
    listNftTransaction: listNftTransaction,
    unlistNftTransaction: unlistNftTransaction,
    updateNftTransaction: updateNftTransaction,
    // Admin Panel
    getData: getData,
    addEvent: addEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};

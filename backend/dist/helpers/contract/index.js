"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAcceptBidTx = exports.makeCancelBidTx = exports.makeUpdateBidTx = exports.makeBidTx = exports.makeBuyTx = exports.makeCancelListTx = exports.makeUpdateListTx = exports.makeListTx = exports.getProgram = exports.getProvider = void 0;
var sol_rayz_1 = require("@nfteyez/sol-rayz");
var anchor = __importStar(require("@project-serum/anchor"));
var nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
var token_1 = require("@project-serum/anchor/dist/cjs/utils/token");
var web3_js_1 = require("@solana/web3.js");
var dev_1 = require("../../config/dev");
var idl_1 = require("../../constants/idl");
var connection_1 = require("../solana/connection");
var solana_1 = require("../solana");
var connection = new web3_js_1.Connection(dev_1.CLUSTER_API, {
    skipPreflight: true,
    preflightCommitment: 'confirmed',
});
var ADMIN_WALLET = web3_js_1.Keypair.fromSeed(Uint8Array.from(dev_1.KEYPAIR).slice(0, 32));
var solanaClient = new solana_1.SolanaClient({ rpcEndpoint: dev_1.CLUSTER_API });
var getProvider = function () {
    return new anchor.Provider(connection, new nodewallet_1.default(ADMIN_WALLET), {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
    });
};
exports.getProvider = getProvider;
var getProgram = function () {
    var provider = (0, exports.getProvider)();
    var program = new anchor.Program(idl_1.IDL, new web3_js_1.PublicKey(dev_1.PROGRAM_ID), provider);
    return program;
};
exports.getProgram = getProgram;
var makeListTx = function (price, accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mint, tokenAccount, program, instructions, signers, _a, pool, bump, lamportsPrice, priceHigh, priceLow, ataToTx, nftTo, transaction, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                user = accounts.user, mint = accounts.mint, tokenAccount = accounts.tokenAccount;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), user.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                _a = _b.sent(), pool = _a[0], bump = _a[1];
                lamportsPrice = price * web3_js_1.LAMPORTS_PER_SOL;
                priceHigh = Math.floor(lamportsPrice / web3_js_1.LAMPORTS_PER_SOL);
                priceLow = lamportsPrice % web3_js_1.LAMPORTS_PER_SOL;
                return [4 /*yield*/, (0, connection_1.makeATokenAccountTransaction)(connection, user, pool, mint)];
            case 2:
                ataToTx = _b.sent();
                instructions = __spreadArray(__spreadArray([], instructions, true), ataToTx.instructions, true);
                signers = __spreadArray(__spreadArray([], signers, true), ataToTx.signers, true);
                nftTo = ataToTx.tokenTo;
                console.log('nftTo', nftTo);
                instructions.push(program.instruction.list(priceHigh, priceLow, bump, {
                    accounts: {
                        pool: pool,
                        user: user,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        tokenFrom: tokenAccount,
                        tokenTo: nftTo,
                        tokenProgram: token_1.TOKEN_PROGRAM_ID,
                        systemProgram: web3_js_1.SystemProgram.programId
                    }
                }));
                signers.push(ADMIN_WALLET);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, user)];
            case 3:
                transaction = _b.sent();
                return [2 /*return*/, transaction];
            case 4:
                error_1 = _b.sent();
                console.log('error', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
exports.makeListTx = makeListTx;
var makeUpdateListTx = function (price, accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mint, tokenAccount, program, instructions, signers, _a, pool, bump, lamportsPrice, priceHigh, priceLow, transaction, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                user = accounts.user, mint = accounts.mint, tokenAccount = accounts.tokenAccount;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), user.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                _a = _b.sent(), pool = _a[0], bump = _a[1];
                lamportsPrice = price * web3_js_1.LAMPORTS_PER_SOL;
                priceHigh = Math.floor(lamportsPrice / web3_js_1.LAMPORTS_PER_SOL);
                priceLow = lamportsPrice % web3_js_1.LAMPORTS_PER_SOL;
                instructions.push(program.instruction.updateList(priceHigh, priceLow, {
                    accounts: {
                        pool: pool,
                        user: user,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        tokenAccount: tokenAccount
                    }
                }));
                signers.push(ADMIN_WALLET);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, user)];
            case 2:
                transaction = _b.sent();
                return [2 /*return*/, transaction];
            case 3:
                error_2 = _b.sent();
                console.log('error', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
exports.makeUpdateListTx = makeUpdateListTx;
var makeCancelListTx = function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mint, tokenAccount, program, instructions, signers, _a, pool, bump, ataToTx, nftTo, transaction, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                user = accounts.user, mint = accounts.mint, tokenAccount = accounts.tokenAccount;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), user.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                _a = _b.sent(), pool = _a[0], bump = _a[1];
                return [4 /*yield*/, (0, connection_1.makeATokenAccountTransaction)(connection, user, user, mint)];
            case 2:
                ataToTx = _b.sent();
                instructions = __spreadArray(__spreadArray([], instructions, true), ataToTx.instructions, true);
                signers = __spreadArray(__spreadArray([], signers, true), ataToTx.signers, true);
                nftTo = ataToTx.tokenTo;
                console.log('nftTo', nftTo);
                instructions.push(program.instruction.cancelList({
                    accounts: {
                        pool: pool,
                        user: user,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        tokenFrom: tokenAccount,
                        tokenTo: nftTo,
                        tokenProgram: token_1.TOKEN_PROGRAM_ID,
                        systemProgram: web3_js_1.SystemProgram.programId
                    }
                }));
                signers.push(ADMIN_WALLET);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, user)];
            case 3:
                transaction = _b.sent();
                return [2 /*return*/, transaction];
            case 4:
                error_3 = _b.sent();
                console.log('error', error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
exports.makeCancelListTx = makeCancelListTx;
var makeBuyTx = function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var buyer, seller, mint, tokenFrom, program, instructions, signers, pool, ataToTx, metadataAccount, data, metadata, remainingAccounts_1, transaction, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                buyer = accounts.buyer, seller = accounts.seller, mint = accounts.mint, tokenFrom = accounts.tokenFrom;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), seller.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                pool = (_a.sent())[0];
                return [4 /*yield*/, (0, connection_1.makeATokenAccountTransaction)(connection, buyer, buyer, mint)];
            case 2:
                ataToTx = _a.sent();
                instructions = __spreadArray(__spreadArray([], instructions, true), ataToTx.instructions, true);
                signers = __spreadArray(__spreadArray([], signers, true), ataToTx.signers, true);
                return [4 /*yield*/, (0, sol_rayz_1.getSolanaMetadataAddress)(mint)];
            case 3:
                metadataAccount = _a.sent();
                return [4 /*yield*/, connection.getAccountInfo(metadataAccount)];
            case 4:
                data = _a.sent();
                return [4 /*yield*/, (0, sol_rayz_1.decodeTokenMetadata)(data.data)];
            case 5:
                metadata = _a.sent();
                remainingAccounts_1 = [];
                metadata.data.creators.forEach(function (creator) {
                    remainingAccounts_1.push({
                        pubkey: creator.address,
                        isWritable: true,
                        isSigner: false
                    });
                });
                console.log('ataToTx.tokenTo', ataToTx.tokenTo.toString());
                instructions.push(program.instruction.buy(0, {
                    accounts: {
                        pool: pool,
                        buyer: buyer,
                        admin: ADMIN_WALLET.publicKey,
                        seller: seller,
                        mint: mint,
                        metadata: metadataAccount,
                        tokenFrom: tokenFrom,
                        tokenTo: ataToTx.tokenTo,
                        tokenProgram: token_1.TOKEN_PROGRAM_ID,
                        systemProgram: web3_js_1.SystemProgram.programId
                    },
                    remainingAccounts: remainingAccounts_1
                }));
                signers.push(ADMIN_WALLET);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, buyer)];
            case 6:
                transaction = _a.sent();
                return [2 /*return*/, transaction];
            case 7:
                error_4 = _a.sent();
                console.log('error', error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, null];
        }
    });
}); };
exports.makeBuyTx = makeBuyTx;
var makeBidTx = function (price, accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var bidder, seller, mint, tokenAccount, vault, program, instructions, signers, _a, bidPda, bump, poolPda, lamportsPrice, priceHigh, priceLow, transaction, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                bidder = accounts.bidder, seller = accounts.seller, mint = accounts.mint, tokenAccount = accounts.tokenAccount, vault = accounts.vault;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.BID_SEED), bidder.toBuffer(), mint.toBuffer(), tokenAccount.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                _a = _b.sent(), bidPda = _a[0], bump = _a[1];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), seller.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 2:
                poolPda = (_b.sent())[0];
                lamportsPrice = price * web3_js_1.LAMPORTS_PER_SOL;
                priceHigh = Math.floor(lamportsPrice / web3_js_1.LAMPORTS_PER_SOL);
                priceLow = lamportsPrice % web3_js_1.LAMPORTS_PER_SOL;
                instructions.push(program.instruction.createBid(priceHigh, priceLow, bump, {
                    accounts: {
                        bid: bidPda,
                        pool: poolPda,
                        bidder: bidder,
                        seller: seller,
                        vault: vault.publicKey,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        tokenAccount: tokenAccount,
                        systemProgram: web3_js_1.SystemProgram.programId
                    }
                }));
                signers.push(ADMIN_WALLET);
                signers.push(vault);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, bidder)];
            case 3:
                transaction = _b.sent();
                return [2 /*return*/, transaction];
            case 4:
                error_5 = _b.sent();
                console.log('error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
exports.makeBidTx = makeBidTx;
var makeUpdateBidTx = function (price, accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var bidder, seller, mint, tokenAccount, vault, program, instructions, signers, bidPda, poolPda, lamportsPrice, priceHigh, priceLow, transaction, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                bidder = accounts.bidder, seller = accounts.seller, mint = accounts.mint, tokenAccount = accounts.tokenAccount, vault = accounts.vault;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.BID_SEED), bidder.toBuffer(), mint.toBuffer(), tokenAccount.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                bidPda = (_a.sent())[0];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), seller.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 2:
                poolPda = (_a.sent())[0];
                lamportsPrice = price * web3_js_1.LAMPORTS_PER_SOL;
                priceHigh = Math.floor(lamportsPrice / web3_js_1.LAMPORTS_PER_SOL);
                priceLow = lamportsPrice % web3_js_1.LAMPORTS_PER_SOL;
                instructions.push(program.instruction.updateBid(priceHigh, priceLow, {
                    accounts: {
                        bid: bidPda,
                        pool: poolPda,
                        bidder: bidder,
                        seller: seller,
                        vault: vault.publicKey,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        tokenAccount: tokenAccount,
                        systemProgram: web3_js_1.SystemProgram.programId
                    }
                }));
                signers.push(ADMIN_WALLET);
                signers.push(vault);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, bidder)];
            case 3:
                transaction = _a.sent();
                return [2 /*return*/, transaction];
            case 4:
                error_6 = _a.sent();
                console.log('error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, null];
        }
    });
}); };
exports.makeUpdateBidTx = makeUpdateBidTx;
var makeCancelBidTx = function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var bidder, mint, tokenAccount, vault, program, instructions, signers, bidPda, transaction, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                bidder = accounts.bidder, mint = accounts.mint, tokenAccount = accounts.tokenAccount, vault = accounts.vault;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.BID_SEED), bidder.toBuffer(), mint.toBuffer(), tokenAccount.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                bidPda = (_a.sent())[0];
                instructions.push(program.instruction.cancelBid({
                    accounts: {
                        bid: bidPda,
                        bidder: bidder,
                        vault: vault.publicKey,
                        admin: ADMIN_WALLET.publicKey,
                        systemProgram: web3_js_1.SystemProgram.programId
                    }
                }));
                signers.push(ADMIN_WALLET);
                signers.push(vault);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, bidder)];
            case 2:
                transaction = _a.sent();
                return [2 /*return*/, transaction];
            case 3:
                error_7 = _a.sent();
                console.log('error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
exports.makeCancelBidTx = makeCancelBidTx;
var makeAcceptBidTx = function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
    var seller, bidder, mint, tokenFrom, vault, program, instructions, signers, bidPda, poolPda, ataToTx, metadataAccount, data, metadata, remainingAccounts_2, transaction, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                seller = accounts.seller, bidder = accounts.bidder, mint = accounts.mint, tokenFrom = accounts.tokenFrom, vault = accounts.vault;
                program = (0, exports.getProgram)();
                instructions = [], signers = [];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.BID_SEED), bidder.toBuffer(), mint.toBuffer(), tokenFrom.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 1:
                bidPda = (_a.sent())[0];
                return [4 /*yield*/, anchor.web3.PublicKey.findProgramAddress([Buffer.from(dev_1.POOL_SEED), seller.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey(dev_1.PROGRAM_ID))];
            case 2:
                poolPda = (_a.sent())[0];
                return [4 /*yield*/, (0, connection_1.makeATokenAccountTransaction)(connection, seller, bidder, mint)];
            case 3:
                ataToTx = _a.sent();
                instructions = __spreadArray(__spreadArray([], instructions, true), ataToTx.instructions, true);
                signers = __spreadArray(__spreadArray([], signers, true), ataToTx.signers, true);
                return [4 /*yield*/, (0, sol_rayz_1.getSolanaMetadataAddress)(mint)];
            case 4:
                metadataAccount = _a.sent();
                return [4 /*yield*/, connection.getAccountInfo(metadataAccount)];
            case 5:
                data = _a.sent();
                return [4 /*yield*/, (0, sol_rayz_1.decodeTokenMetadata)(data.data)];
            case 6:
                metadata = _a.sent();
                remainingAccounts_2 = [];
                metadata.data.creators.forEach(function (creator) {
                    remainingAccounts_2.push({
                        pubkey: creator.address,
                        isWritable: true,
                        isSigner: false
                    });
                });
                instructions.push(program.instruction.acceptBid(0, {
                    accounts: {
                        pool: poolPda,
                        bid: bidPda,
                        vault: vault.publicKey,
                        seller: seller,
                        bidder: bidder,
                        admin: ADMIN_WALLET.publicKey,
                        mint: mint,
                        metadata: metadataAccount,
                        tokenFrom: tokenFrom,
                        tokenTo: ataToTx.tokenTo,
                        systemProgram: web3_js_1.SystemProgram.programId,
                        tokenProgram: token_1.TOKEN_PROGRAM_ID
                    },
                    remainingAccounts: remainingAccounts_2
                }));
                signers.push(ADMIN_WALLET);
                signers.push(vault);
                return [4 /*yield*/, (0, connection_1.makeTransaction)(connection, instructions, signers, seller)];
            case 7:
                transaction = _a.sent();
                return [2 /*return*/, transaction];
            case 8:
                error_8 = _a.sent();
                console.log('error', error_8);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/, null];
        }
    });
}); };
exports.makeAcceptBidTx = makeAcceptBidTx;

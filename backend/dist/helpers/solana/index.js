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
exports.SolanaClient = exports.decodeMetadata = exports.METADATA_PROGRAM_ID_PUBLIC_KEY = void 0;
var buffer_1 = require("buffer");
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var borsh = __importStar(require("borsh"));
var schema_1 = require("../schema");
var axios_1 = __importDefault(require("axios"));
var SOLANA_CLUSTER_ENDPOINT = 'https://api.mainnet-beta.solana.com';
exports.METADATA_PROGRAM_ID_PUBLIC_KEY = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
var METADATA_REPLACE = new RegExp('\u0000', 'g');
function decodeMetadata(buffer) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata;
        return __generator(this, function (_a) {
            metadata = borsh.deserializeUnchecked(schema_1.METADATA_SCHEMA, schema_1.Metadata, buffer);
            metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
            metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
            metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
            return [2 /*return*/, metadata];
        });
    });
}
exports.decodeMetadata = decodeMetadata;
var SolanaClient = /** @class */ (function () {
    function SolanaClient(props) {
        var _this = this;
        var _a;
        this.endpoint = SOLANA_CLUSTER_ENDPOINT;
        this.connection = null;
        /**
         * for each given wallet:
         * - get and parse its token accounts to get the mint addresses
         * - filter out tokens whose decimal places are not 0
         * - find the metadata PDAs for the mint addresses
         * - get the account infos for the PDAs if they exist
         * - get the metadata urls from the account infos and fetch the metadatas
         * - transform the nft metadatas to Audius-domain collectibles
         */
        this.getCollectible = function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
            var connection, program, accountInfo, metadata, tokenInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection = this.connection;
                        return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                buffer_1.Buffer.from('metadata'),
                                exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                new web3_js_1.PublicKey(mintAddress).toBytes()
                            ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                    case 1:
                        program = _a.sent();
                        return [4 /*yield*/, connection.getAccountInfo(program[0])];
                    case 2:
                        accountInfo = _a.sent();
                        return [4 /*yield*/, decodeMetadata(accountInfo.data)];
                    case 3:
                        metadata = _a.sent();
                        if (metadata.data === undefined)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, axios_1.default.get(metadata.data.uri)];
                    case 4:
                        tokenInfo = _a.sent();
                        return [2 /*return*/, __assign(__assign(__assign({}, metadata), metadata.data), tokenInfo.data)];
                    case 5:
                        e_1 = _a.sent();
                        console.error('Unable to get collectibles', e_1);
                        return [2 /*return*/, Promise.resolve({})];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getCollectibleWithoutMetadata = function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
            var connection, program, accountInfo, metadata, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection = this.connection;
                        return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                buffer_1.Buffer.from('metadata'),
                                exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                new web3_js_1.PublicKey(mintAddress).toBytes()
                            ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                    case 1:
                        program = _a.sent();
                        return [4 /*yield*/, connection.getAccountInfo(program[0])];
                    case 2:
                        accountInfo = _a.sent();
                        return [4 /*yield*/, decodeMetadata(accountInfo.data)];
                    case 3:
                        metadata = _a.sent();
                        return [2 /*return*/, __assign({}, metadata)];
                    case 4:
                        e_2 = _a.sent();
                        console.error('Unable to get collectibles', e_2);
                        return [2 /*return*/, Promise.resolve({})];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCollectibles = function (wallets, filters) { return __awaiter(_this, void 0, void 0, function () {
            var connection_1, tokenAccountsByOwnerAddress, potentialNFTsByOwnerAddress, nfts_1, solanaCollectibles, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection_1 = this.connection;
                        return [4 /*yield*/, Promise.all(wallets.map(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, connection_1.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(address), {
                                            programId: spl_token_1.TOKEN_PROGRAM_ID
                                        })];
                                });
                            }); }))];
                    case 1:
                        tokenAccountsByOwnerAddress = _a.sent();
                        potentialNFTsByOwnerAddress = tokenAccountsByOwnerAddress
                            .map(function (ta) { return ta.value; })
                            // value is an array of parsed token info
                            .map(function (value) {
                            var mintAddresses = value
                                .map(function (v) { return ({
                                mint: v.account.data.parsed.info.mint,
                                tokenAmount: v.account.data.parsed.info.tokenAmount,
                                tokenAccount: v.pubkey.toString()
                            }); })
                                .filter(function (_a) {
                                var tokenAmount = _a.tokenAmount;
                                // Filter out the token if we don't have any balance
                                var ownsNFT = tokenAmount.amount !== '0';
                                // Filter out the tokens that don't have 0 decimal places.
                                // NFTs really should have 0
                                var hasNoDecimals = tokenAmount.decimals === 0;
                                return ownsNFT && hasNoDecimals;
                            })
                                .map(function (_a) {
                                var mint = _a.mint, tokenAccount = _a.tokenAccount;
                                return ({ mint: mint, tokenAccount: tokenAccount });
                            });
                            return { mintAddresses: mintAddresses };
                        });
                        return [4 /*yield*/, Promise.all(potentialNFTsByOwnerAddress.map(function (_a) {
                                var mintAddresses = _a.mintAddresses;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var programAddresses, accountInfos, cur, subAddresses, subAccountInfos, nonNullInfos, metadataList, tokenInfoList, _loop_1, i, results, metadatas, newMetadataList;
                                    var _this = this;
                                    var _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, Promise.all(mintAddresses.map(function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
                                                    var program;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                                                    buffer_1.Buffer.from('metadata'),
                                                                    exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                                    new web3_js_1.PublicKey(mintAddress.mint).toBytes()
                                                                ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                                                            case 1:
                                                                program = _a.sent();
                                                                return [2 /*return*/, __assign(__assign({}, mintAddress), { program: program })];
                                                        }
                                                    });
                                                }); }))];
                                            case 1:
                                                programAddresses = _c.sent();
                                                accountInfos = [];
                                                cur = 0;
                                                _c.label = 2;
                                            case 2:
                                                if (!(cur < programAddresses.length)) return [3 /*break*/, 5];
                                                subAddresses = programAddresses.slice(cur, cur + 100);
                                                return [4 /*yield*/, connection_1.getMultipleAccountsInfo(subAddresses.map(function (program) { return program.program[0]; }))];
                                            case 3:
                                                subAccountInfos = _c.sent();
                                                accountInfos = __spreadArray(__spreadArray([], accountInfos, true), subAccountInfos, true);
                                                cur += 100;
                                                _c.label = 4;
                                            case 4: return [3 /*break*/, 2];
                                            case 5:
                                                accountInfos = accountInfos.map(function (account, index) { return (__assign({ account: account }, programAddresses[index])); });
                                                nonNullInfos = (_b = accountInfos === null || accountInfos === void 0 ? void 0 : accountInfos.filter(function (info) { return info.account; })) !== null && _b !== void 0 ? _b : [];
                                                metadataList = [];
                                                tokenInfoList = [];
                                                _loop_1 = function (i) {
                                                    var metadata;
                                                    return __generator(this, function (_d) {
                                                        switch (_d.label) {
                                                            case 0: return [4 /*yield*/, decodeMetadata(nonNullInfos[i].account.data)];
                                                            case 1:
                                                                metadata = _d.sent();
                                                                if (metadata.data === undefined)
                                                                    return [2 /*return*/, "continue"];
                                                                if (filters.length === 0 || filters.find(function (filter) { var _a; return metadata.updateAuthority === filter.updateAuthority && ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.data) === null || _a === void 0 ? void 0 : _a.name.indexOf(filter.collectionName)) >= 0; })) {
                                                                    metadataList.push(__assign(__assign({}, metadata), metadata.data));
                                                                    tokenInfoList.push(nonNullInfos[i]);
                                                                }
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                i = 0;
                                                _c.label = 6;
                                            case 6:
                                                if (!(i < nonNullInfos.length)) return [3 /*break*/, 9];
                                                return [5 /*yield**/, _loop_1(i)];
                                            case 7:
                                                _c.sent();
                                                _c.label = 8;
                                            case 8:
                                                i++;
                                                return [3 /*break*/, 6];
                                            case 9: return [4 /*yield*/, Promise.all(metadataList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        return [2 /*return*/, axios_1.default.get(item.data.uri)
                                                                .then(function (res) { return res.data; })
                                                                .catch(function () { return null; })];
                                                    });
                                                }); }))];
                                            case 10:
                                                results = _c.sent();
                                                metadatas = results.map(function (metadata, i) { return (__assign(__assign(__assign({}, metadata), metadataList[i]), tokenInfoList[i])); });
                                                newMetadataList = metadatas.filter(function (meta) { return meta; });
                                                return [2 /*return*/, newMetadataList];
                                        }
                                    });
                                });
                            }))];
                    case 2:
                        nfts_1 = _a.sent();
                        return [4 /*yield*/, Promise.all(nfts_1.map(function (nftsForAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                                var newCollectibles;
                                return __generator(this, function (_a) {
                                    newCollectibles = [];
                                    nftsForAddress.forEach(function (collect, index) {
                                        if (collect) {
                                            var nft = nfts_1[i][index];
                                            newCollectibles.push(__assign(__assign(__assign({}, collect), nft), { mint: nft.mint, tokenAccount: nft.tokenAccount }));
                                        }
                                    });
                                    return [2 /*return*/, newCollectibles];
                                });
                            }); }))];
                    case 3:
                        solanaCollectibles = _a.sent();
                        return [2 /*return*/, solanaCollectibles.reduce(function (result, collectibles, i) {
                                var _a;
                                return (__assign(__assign({}, result), (_a = {}, _a[wallets[i]] = collectibles, _a)));
                            }, {})];
                    case 4:
                        e_3 = _a.sent();
                        console.error('Unable to get collectibles', e_3);
                        return [2 /*return*/, Promise.resolve({})];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCollectiblesWithCreator = function (wallets, creators) { return __awaiter(_this, void 0, void 0, function () {
            var connection_2, tokenAccountsByOwnerAddress, potentialNFTsByOwnerAddress, nfts_2, solanaCollectibles, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection_2 = this.connection;
                        return [4 /*yield*/, Promise.all(wallets.map(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, connection_2.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(address), {
                                            programId: spl_token_1.TOKEN_PROGRAM_ID
                                        })];
                                });
                            }); }))];
                    case 1:
                        tokenAccountsByOwnerAddress = _a.sent();
                        potentialNFTsByOwnerAddress = tokenAccountsByOwnerAddress
                            .map(function (ta) { return ta.value; })
                            // value is an array of parsed token info
                            .map(function (value) {
                            var mintAddresses = value
                                .map(function (v) { return ({
                                mint: v.account.data.parsed.info.mint,
                                tokenAmount: v.account.data.parsed.info.tokenAmount,
                                tokenAccount: v.pubkey.toString()
                            }); })
                                .filter(function (_a) {
                                var tokenAmount = _a.tokenAmount;
                                // Filter out the token if we don't have any balance
                                var ownsNFT = tokenAmount.amount !== '0';
                                // Filter out the tokens that don't have 0 decimal places.
                                // NFTs really should have 0
                                var hasNoDecimals = tokenAmount.decimals === 0;
                                return ownsNFT && hasNoDecimals;
                            })
                                .map(function (_a) {
                                var mint = _a.mint, tokenAccount = _a.tokenAccount;
                                return ({ mint: mint, tokenAccount: tokenAccount });
                            });
                            return { mintAddresses: mintAddresses };
                        });
                        return [4 /*yield*/, Promise.all(potentialNFTsByOwnerAddress.map(function (_a) {
                                var mintAddresses = _a.mintAddresses;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var programAddresses, accountInfos, cur, subAddresses, subAccountInfos, nonNullInfos, metadataList, tokenInfoList, _loop_2, i, results, metadatas, newMetadataList;
                                    var _this = this;
                                    var _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, Promise.all(mintAddresses.map(function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
                                                    var program;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                                                    buffer_1.Buffer.from('metadata'),
                                                                    exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                                    new web3_js_1.PublicKey(mintAddress.mint).toBytes()
                                                                ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                                                            case 1:
                                                                program = _a.sent();
                                                                return [2 /*return*/, __assign(__assign({}, mintAddress), { program: program })];
                                                        }
                                                    });
                                                }); }))];
                                            case 1:
                                                programAddresses = _c.sent();
                                                accountInfos = [];
                                                cur = 0;
                                                _c.label = 2;
                                            case 2:
                                                if (!(cur < programAddresses.length)) return [3 /*break*/, 5];
                                                subAddresses = programAddresses.slice(cur, cur + 100);
                                                return [4 /*yield*/, connection_2.getMultipleAccountsInfo(subAddresses.map(function (program) { return program.program[0]; }))];
                                            case 3:
                                                subAccountInfos = _c.sent();
                                                accountInfos = __spreadArray(__spreadArray([], accountInfos, true), subAccountInfos, true);
                                                cur += 100;
                                                _c.label = 4;
                                            case 4: return [3 /*break*/, 2];
                                            case 5:
                                                accountInfos = accountInfos.map(function (account, index) { return (__assign({ account: account }, programAddresses[index])); });
                                                nonNullInfos = (_b = accountInfos === null || accountInfos === void 0 ? void 0 : accountInfos.filter(function (info) { return info.account; })) !== null && _b !== void 0 ? _b : [];
                                                metadataList = [];
                                                tokenInfoList = [];
                                                _loop_2 = function (i) {
                                                    var metadata;
                                                    return __generator(this, function (_d) {
                                                        switch (_d.label) {
                                                            case 0: return [4 /*yield*/, decodeMetadata(nonNullInfos[i].account.data)];
                                                            case 1:
                                                                metadata = _d.sent();
                                                                if (metadata.data === undefined)
                                                                    return [2 /*return*/, "continue"];
                                                                if (metadata.data.creators === undefined)
                                                                    return [2 /*return*/, "continue"];
                                                                if (creators.length === 0 || creators.find(function (creator) { return metadata.data.creators[0].address === creator; })) {
                                                                    metadataList.push(__assign(__assign({}, metadata), metadata.data));
                                                                    tokenInfoList.push(nonNullInfos[i]);
                                                                }
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                i = 0;
                                                _c.label = 6;
                                            case 6:
                                                if (!(i < nonNullInfos.length)) return [3 /*break*/, 9];
                                                return [5 /*yield**/, _loop_2(i)];
                                            case 7:
                                                _c.sent();
                                                _c.label = 8;
                                            case 8:
                                                i++;
                                                return [3 /*break*/, 6];
                                            case 9: return [4 /*yield*/, Promise.all(metadataList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        return [2 /*return*/, axios_1.default.get(item.data.uri)
                                                                .then(function (res) { return res.data; })
                                                                .catch(function () { return null; })];
                                                    });
                                                }); }))];
                                            case 10:
                                                results = _c.sent();
                                                metadatas = results.map(function (metadata, i) { return (__assign(__assign(__assign({}, metadata), metadataList[i]), tokenInfoList[i])); });
                                                newMetadataList = metadatas.filter(function (meta) { return meta; });
                                                return [2 /*return*/, newMetadataList];
                                        }
                                    });
                                });
                            }))];
                    case 2:
                        nfts_2 = _a.sent();
                        return [4 /*yield*/, Promise.all(nfts_2.map(function (nftsForAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                                var newCollectibles;
                                return __generator(this, function (_a) {
                                    newCollectibles = [];
                                    nftsForAddress.forEach(function (collect, index) {
                                        if (collect) {
                                            var nft = nfts_2[i][index];
                                            newCollectibles.push(__assign(__assign(__assign({}, collect), nft), { mint: nft.mint, tokenAccount: nft.tokenAccount }));
                                        }
                                    });
                                    return [2 /*return*/, newCollectibles];
                                });
                            }); }))];
                    case 3:
                        solanaCollectibles = _a.sent();
                        return [2 /*return*/, solanaCollectibles.reduce(function (result, collectibles, i) {
                                var _a;
                                return (__assign(__assign({}, result), (_a = {}, _a[wallets[i]] = collectibles, _a)));
                            }, {})];
                    case 4:
                        e_4 = _a.sent();
                        console.error('Unable to get collectibles', e_4);
                        return [2 /*return*/, Promise.resolve({})];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCollectiblesFromMintAddress = function (mintAddressesFromWallet, filters) { return __awaiter(_this, void 0, void 0, function () {
            var connection, staking_nfts_1, wallets_1, _loop_3, _a, _b, _i, wallet, solanaCollectibles, e_5;
            var _this = this;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection = this.connection;
                        staking_nfts_1 = [];
                        wallets_1 = [];
                        _loop_3 = function (wallet) {
                            var programAddresses, accountInfos, cur, subAddresses, subAccountInfos, nonNullInfos, metadataList, tokenInfoList, _loop_4, i, results, metadatas, newMetadataList;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, Promise.all(mintAddressesFromWallet[wallet].map(function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
                                            var program;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                                            buffer_1.Buffer.from('metadata'),
                                                            exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                            new web3_js_1.PublicKey(mintAddress).toBytes()
                                                        ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                                                    case 1:
                                                        program = _a.sent();
                                                        return [2 /*return*/, {
                                                                mintAddress: mintAddress,
                                                                program: program
                                                            }];
                                                }
                                            });
                                        }); }))];
                                    case 1:
                                        programAddresses = _e.sent();
                                        accountInfos = [];
                                        cur = 0;
                                        _e.label = 2;
                                    case 2:
                                        if (!(cur < programAddresses.length)) return [3 /*break*/, 5];
                                        subAddresses = programAddresses.slice(cur, cur + 100);
                                        return [4 /*yield*/, connection.getMultipleAccountsInfo(subAddresses.map(function (program) { return program.program[0]; }))];
                                    case 3:
                                        subAccountInfos = _e.sent();
                                        accountInfos = __spreadArray(__spreadArray([], accountInfos, true), subAccountInfos, true);
                                        cur += 100;
                                        _e.label = 4;
                                    case 4: return [3 /*break*/, 2];
                                    case 5:
                                        accountInfos = accountInfos.map(function (account, index) { return (__assign({ account: account }, programAddresses[index])); });
                                        nonNullInfos = (_c = accountInfos === null || accountInfos === void 0 ? void 0 : accountInfos.filter(function (info) { return info.account; })) !== null && _c !== void 0 ? _c : [];
                                        metadataList = [];
                                        tokenInfoList = [];
                                        _loop_4 = function (i) {
                                            var metadata;
                                            return __generator(this, function (_f) {
                                                switch (_f.label) {
                                                    case 0: return [4 /*yield*/, decodeMetadata(nonNullInfos[i].account.data)];
                                                    case 1:
                                                        metadata = _f.sent();
                                                        if (metadata.data === undefined)
                                                            return [2 /*return*/, "continue"];
                                                        if (filters.length === 0 || filters.find(function (filter) { var _a; return metadata.updateAuthority === filter.updateAuthority && ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.data) === null || _a === void 0 ? void 0 : _a.name.indexOf(filter.collectionName)) >= 0; })) {
                                                            metadataList.push(__assign(__assign({}, metadata), metadata.data));
                                                            tokenInfoList.push(nonNullInfos[i]);
                                                        }
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 0;
                                        _e.label = 6;
                                    case 6:
                                        if (!(i < nonNullInfos.length)) return [3 /*break*/, 9];
                                        return [5 /*yield**/, _loop_4(i)];
                                    case 7:
                                        _e.sent();
                                        _e.label = 8;
                                    case 8:
                                        i++;
                                        return [3 /*break*/, 6];
                                    case 9: return [4 /*yield*/, Promise.all(metadataList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                return [2 /*return*/, axios_1.default.get(item.data.uri)
                                                        .then(function (res) { return res.data; })
                                                        .catch(function () { return null; })];
                                            });
                                        }); }))];
                                    case 10:
                                        results = _e.sent();
                                        metadatas = results.map(function (metadata, i) { return (__assign(__assign(__assign({}, metadata), metadataList[i]), tokenInfoList[i])); });
                                        newMetadataList = metadatas.filter(function (meta) { return meta; });
                                        staking_nfts_1.push(newMetadataList);
                                        wallets_1.push(wallet);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in mintAddressesFromWallet)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        wallet = _a[_i];
                        return [5 /*yield**/, _loop_3(wallet)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, Promise.all(staking_nfts_1.map(function (nftsForAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                            var newCollectibles;
                            return __generator(this, function (_a) {
                                newCollectibles = [];
                                nftsForAddress.forEach(function (collect, index) {
                                    if (collect) {
                                        var nft = staking_nfts_1[i][index];
                                        newCollectibles.push(__assign(__assign(__assign({}, collect), nft), { mint: nft.mint, tokenAccount: nft.tokenAccount }));
                                    }
                                });
                                return [2 /*return*/, newCollectibles];
                            });
                        }); }))];
                    case 5:
                        solanaCollectibles = _d.sent();
                        return [2 /*return*/, solanaCollectibles.reduce(function (result, collectibles, i) {
                                var _a;
                                return (__assign(__assign({}, result), (_a = {}, _a[wallets_1[i]] = collectibles, _a)));
                            }, {})];
                    case 6:
                        e_5 = _d.sent();
                        console.error('Unable to get collectibles', e_5);
                        return [2 /*return*/, Promise.resolve({})];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCollectiblesFromHashList = function (hashlist, filters) { return __awaiter(_this, void 0, void 0, function () {
            var connection, staking_nfts_2, wallets, programAddresses_1, accountInfos, cur, subAddresses, subAccountInfos, nonNullInfos, metadataList_1, tokenInfoList_1, _loop_5, i, results, metadatas, newMetadataList, solanaCollectibles, e_6;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection = this.connection;
                        staking_nfts_2 = [];
                        wallets = [];
                        return [4 /*yield*/, Promise.all(hashlist.map(function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
                                var program;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                                buffer_1.Buffer.from('metadata'),
                                                exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                new web3_js_1.PublicKey(mintAddress).toBytes()
                                            ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                                        case 1:
                                            program = _a.sent();
                                            return [2 /*return*/, {
                                                    mintAddress: mintAddress,
                                                    program: program
                                                }];
                                    }
                                });
                            }); }))];
                    case 1:
                        programAddresses_1 = _b.sent();
                        accountInfos = [];
                        cur = 0;
                        _b.label = 2;
                    case 2:
                        if (!(cur < programAddresses_1.length)) return [3 /*break*/, 5];
                        subAddresses = programAddresses_1.slice(cur, cur + 100);
                        return [4 /*yield*/, connection.getMultipleAccountsInfo(subAddresses.map(function (program) { return program.program[0]; }))];
                    case 3:
                        subAccountInfos = _b.sent();
                        accountInfos = __spreadArray(__spreadArray([], accountInfos, true), subAccountInfos, true);
                        cur += 100;
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5:
                        accountInfos = accountInfos.map(function (account, index) { return (__assign({ account: account }, programAddresses_1[index])); });
                        nonNullInfos = (_a = accountInfos === null || accountInfos === void 0 ? void 0 : accountInfos.filter(function (info) { return info.account; })) !== null && _a !== void 0 ? _a : [];
                        metadataList_1 = [];
                        tokenInfoList_1 = [];
                        _loop_5 = function (i) {
                            var metadata;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, decodeMetadata(nonNullInfos[i].account.data)];
                                    case 1:
                                        metadata = _c.sent();
                                        if (metadata.data === undefined)
                                            return [2 /*return*/, "continue"];
                                        if (filters.length === 0 || filters.find(function (filter) { var _a; return metadata.updateAuthority === filter.updateAuthority && ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.data) === null || _a === void 0 ? void 0 : _a.name.indexOf(filter.collectionName)) >= 0; })) {
                                            metadataList_1.push(__assign(__assign({}, metadata), metadata.data));
                                            tokenInfoList_1.push(nonNullInfos[i]);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _b.label = 6;
                    case 6:
                        if (!(i < nonNullInfos.length)) return [3 /*break*/, 9];
                        return [5 /*yield**/, _loop_5(i)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [4 /*yield*/, Promise.all(metadataList_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, axios_1.default.get(item.data.uri)
                                        .then(function (res) { return res.data; })
                                        .catch(function () { return null; })];
                            });
                        }); }))];
                    case 10:
                        results = _b.sent();
                        metadatas = results.map(function (metadata, i) { return (__assign(__assign(__assign({}, metadata), metadataList_1[i]), tokenInfoList_1[i])); });
                        newMetadataList = metadatas.filter(function (meta) { return meta; });
                        staking_nfts_2.push(newMetadataList);
                        return [4 /*yield*/, Promise.all(staking_nfts_2.map(function (nftsForAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                                var newCollectibles;
                                return __generator(this, function (_a) {
                                    newCollectibles = [];
                                    nftsForAddress.forEach(function (collect, index) {
                                        if (collect) {
                                            var nft = staking_nfts_2[i][index];
                                            newCollectibles.push(__assign(__assign(__assign({}, collect), nft), { mint: nft.mint, tokenAccount: nft.tokenAccount }));
                                        }
                                    });
                                    return [2 /*return*/, newCollectibles];
                                });
                            }); }))];
                    case 11:
                        solanaCollectibles = _b.sent();
                        return [2 /*return*/, solanaCollectibles.reduce(function (result, collectibles, i) { return (__assign(__assign({}, result), { nfts: collectibles })); }, {})];
                    case 12:
                        e_6 = _b.sent();
                        console.error('Unable to get collectibles', e_6);
                        return [2 /*return*/, Promise.resolve({})];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCollectiblesFromMintAddressWithCreator = function (mintAddressesFromWallet, creators) { return __awaiter(_this, void 0, void 0, function () {
            var connection, staking_nfts_3, wallets_2, _loop_6, _a, _b, _i, wallet, solanaCollectibles, e_7;
            var _this = this;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        if (this.connection === null)
                            throw new Error('No connection');
                        connection = this.connection;
                        staking_nfts_3 = [];
                        wallets_2 = [];
                        _loop_6 = function (wallet) {
                            var programAddresses, accountInfos, cur, subAddresses, subAccountInfos, nonNullInfos, metadataList, tokenInfoList, _loop_7, i, results, metadatas, newMetadataList;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, Promise.all(mintAddressesFromWallet[wallet].map(function (mintAddress) { return __awaiter(_this, void 0, void 0, function () {
                                            var program;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                                                            buffer_1.Buffer.from('metadata'),
                                                            exports.METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
                                                            new web3_js_1.PublicKey(mintAddress).toBytes()
                                                        ], exports.METADATA_PROGRAM_ID_PUBLIC_KEY)];
                                                    case 1:
                                                        program = _a.sent();
                                                        return [2 /*return*/, {
                                                                mintAddress: mintAddress,
                                                                program: program
                                                            }];
                                                }
                                            });
                                        }); }))];
                                    case 1:
                                        programAddresses = _e.sent();
                                        accountInfos = [];
                                        cur = 0;
                                        _e.label = 2;
                                    case 2:
                                        if (!(cur < programAddresses.length)) return [3 /*break*/, 5];
                                        subAddresses = programAddresses.slice(cur, cur + 100);
                                        return [4 /*yield*/, connection.getMultipleAccountsInfo(subAddresses.map(function (program) { return program.program[0]; }))];
                                    case 3:
                                        subAccountInfos = _e.sent();
                                        accountInfos = __spreadArray(__spreadArray([], accountInfos, true), subAccountInfos, true);
                                        cur += 100;
                                        _e.label = 4;
                                    case 4: return [3 /*break*/, 2];
                                    case 5:
                                        accountInfos = accountInfos.map(function (account, index) { return (__assign({ account: account }, programAddresses[index])); });
                                        nonNullInfos = (_c = accountInfos === null || accountInfos === void 0 ? void 0 : accountInfos.filter(function (info) { return info.account; })) !== null && _c !== void 0 ? _c : [];
                                        metadataList = [];
                                        tokenInfoList = [];
                                        _loop_7 = function (i) {
                                            var metadata;
                                            return __generator(this, function (_f) {
                                                switch (_f.label) {
                                                    case 0: return [4 /*yield*/, decodeMetadata(nonNullInfos[i].account.data)];
                                                    case 1:
                                                        metadata = _f.sent();
                                                        if (metadata.data === undefined)
                                                            return [2 /*return*/, "continue"];
                                                        if (metadata.data.creators === undefined)
                                                            return [2 /*return*/, "continue"];
                                                        if (creators.find(function (creator) { return metadata.data.creators[0].address === creator; })) {
                                                            metadataList.push(__assign(__assign({}, metadata), metadata.data));
                                                            tokenInfoList.push(nonNullInfos[i]);
                                                        }
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 0;
                                        _e.label = 6;
                                    case 6:
                                        if (!(i < nonNullInfos.length)) return [3 /*break*/, 9];
                                        return [5 /*yield**/, _loop_7(i)];
                                    case 7:
                                        _e.sent();
                                        _e.label = 8;
                                    case 8:
                                        i++;
                                        return [3 /*break*/, 6];
                                    case 9: return [4 /*yield*/, Promise.all(metadataList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                return [2 /*return*/, axios_1.default.get(item.data.uri)
                                                        .then(function (res) { return res.data; })
                                                        .catch(function () { return null; })];
                                            });
                                        }); }))];
                                    case 10:
                                        results = _e.sent();
                                        metadatas = results.map(function (metadata, i) { return (__assign(__assign(__assign({}, metadata), metadataList[i]), tokenInfoList[i])); });
                                        newMetadataList = metadatas.filter(function (meta) { return meta; });
                                        staking_nfts_3.push(newMetadataList);
                                        wallets_2.push(wallet);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in mintAddressesFromWallet)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        wallet = _a[_i];
                        return [5 /*yield**/, _loop_6(wallet)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, Promise.all(staking_nfts_3.map(function (nftsForAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                            var newCollectibles;
                            return __generator(this, function (_a) {
                                newCollectibles = [];
                                nftsForAddress.forEach(function (collect, index) {
                                    if (collect) {
                                        var nft = staking_nfts_3[i][index];
                                        newCollectibles.push(__assign(__assign(__assign({}, collect), nft), { mint: nft.mint, tokenAccount: nft.tokenAccount }));
                                    }
                                });
                                return [2 /*return*/, newCollectibles];
                            });
                        }); }))];
                    case 5:
                        solanaCollectibles = _d.sent();
                        return [2 /*return*/, solanaCollectibles.reduce(function (result, collectibles, i) {
                                var _a;
                                return (__assign(__assign({}, result), (_a = {}, _a[wallets_2[i]] = collectibles, _a)));
                            }, {})];
                    case 6:
                        e_7 = _d.sent();
                        console.error('Unable to get collectibles', e_7);
                        return [2 /*return*/, Promise.resolve({})];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Decode bytes to get url for nft metadata
         * Check urls based on nft standard e.g. metaplex, or nft collection e.g. solamander, or known domains e.g. ipfs
         * This is because there may be multiple different collections of nfts on e.g. metaplex (arweave), also
         * a given nft collection can have nfts living in different domains e.g. solamander on cloudfront or arweave or etc., also
         * nfts may live in ipfs or other places
         */
        this._utf8ArrayToNFTType = function (array) {
            var text = new TextDecoder().decode(array);
            // for the sake of simplicty/readability/understandability, we check the decoded url
            // one by one against metaplex, star atlas, and others
            return (_this._metaplex(text) ||
                _this._starAtlas(text) ||
                _this._jsonExtension(text) ||
                _this._ipfs(text));
        };
        this._metaplex = function (text) {
            var query = 'https://';
            var startIndex = text.indexOf(query);
            if (startIndex === -1)
                return null;
            // metaplex standard nfts live in arweave, see link below
            // https://github.com/metaplex-foundation/metaplex/blob/81023eb3e52c31b605e1dcf2eb1e7425153600cd/js/packages/web/src/contexts/meta/processMetaData.ts#L29
            var isMetaplex = text.includes('arweave');
            var foundNFTUrl = startIndex > -1 && isMetaplex;
            if (!foundNFTUrl)
                return null;
            var suffix = '/';
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1)
                return null;
            var hashLength = 43;
            var endIndex = suffixIndex + suffix.length + hashLength;
            var url = text.substring(startIndex, endIndex);
            return {
                type: 'METAPLEX',
                url: url
            };
        };
        this._starAtlas = function (text) {
            var query = 'https://';
            var startIndex = text.indexOf(query);
            if (startIndex === -1)
                return null;
            // star atlas nfts live in https://galaxy.staratlas.com/nfts/...
            var isStarAtlas = text.includes('staratlas');
            var foundNFTUrl = startIndex > -1 && isStarAtlas;
            if (!foundNFTUrl)
                return null;
            var suffix = '/nfts/';
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1)
                return null;
            var hashLength = 44;
            var endIndex = suffixIndex + suffix.length + hashLength;
            var url = text.substring(startIndex, endIndex);
            return {
                type: 'STAR_ATLAS',
                url: url
            };
        };
        this._jsonExtension = function (text) {
            // Look for 'https://<...>.json' and that will be the metadata location
            // examples:
            // https://d1b6hed00dtfsr.cloudfront.net/9086.json
            // https://cdn.piggygang.com/meta/3ad355d46a9cb2ee57049db4df57088f.json
            var query = 'https://';
            var startIndex = text.indexOf(query);
            if (startIndex === -1)
                return null;
            var extension = '.json';
            var extensionIndex = text.indexOf(extension);
            var foundNFTUrl = startIndex > -1 && extensionIndex > -1;
            if (!foundNFTUrl)
                return null;
            var endIndex = extensionIndex + extension.length;
            var url = text.substring(startIndex, endIndex);
            return {
                type: 'METAPLEX',
                url: url
            };
        };
        this._ipfs = function (text) {
            // Look for 'https://ipfs.io/ipfs/<...alphanumeric...>' and that will be the metadata location
            // e.g. https://ipfs.io/ipfs/QmWJC47JYuvxYw63cRq81bBNGFXPjhQH8nXg71W5JeRMrC
            var query = 'https://';
            var startIndex = text.indexOf(query);
            if (startIndex === -1) {
                startIndex = text.indexOf('http://');
                if (startIndex === -1)
                    return null;
            }
            var isIpfs = text.includes('ipfs');
            var foundNFTUrl = startIndex > -1 && isIpfs;
            if (!foundNFTUrl)
                return null;
            var suffix = '/ipfs/';
            var suffixIndex = text.indexOf(suffix, startIndex + query.length);
            if (suffixIndex === -1)
                return null;
            var endIndex = suffixIndex + suffix.length;
            while (/[a-zA-Z0-9]/.test(text.charAt(endIndex++))) { }
            var url = text.substring(startIndex, endIndex);
            return {
                type: 'METAPLEX',
                url: url
            };
        };
        this.endpoint = (_a = props === null || props === void 0 ? void 0 : props.rpcEndpoint) !== null && _a !== void 0 ? _a : this.endpoint;
        try {
            this.connection = new web3_js_1.Connection(this.endpoint, 'confirmed');
        }
        catch (e) {
            console.error('Could not create Solana RPC connection', e);
            this.connection = null;
        }
    }
    return SolanaClient;
}());
exports.SolanaClient = SolanaClient;

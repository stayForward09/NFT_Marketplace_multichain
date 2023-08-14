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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMintAddress = exports.getMintAddress = exports.getCandyMachineV2Creator = exports.getCandyMachineVersion = void 0;
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var web3_js_1 = require("@solana/web3.js");
var config_1 = require("../../config");
var connection = new web3_js_1.Connection(config_1.CLUSTER_API);
var TOKEN_METADATA_PROGRAM = new web3_js_1.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
var CANDY_MACHINE_V1_PROGRAM = new web3_js_1.PublicKey('cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ');
var CANDY_MACHINE_V2_PROGRAM = new web3_js_1.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');
var MAX_NAME_LENGTH = 32;
var MAX_URI_LENGTH = 200;
var MAX_SYMBOL_LENGTH = 10;
var MAX_CREATOR_LEN = 32 + 1 + 1;
var MAX_CREATOR_LIMIT = 5;
var MAX_DATA_SIZE = 4 + MAX_NAME_LENGTH + 4 + MAX_SYMBOL_LENGTH + 4 + MAX_URI_LENGTH + 2 + 1 + 4 + MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
var MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
var CREATOR_ARRAY_START = 1 + 32 + 32 + 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH + 4 + MAX_SYMBOL_LENGTH + 2 + 1 + 4;
// Get Candy Machine Version
var getCandyMachineVersion = function (candyMachineId) { return __awaiter(void 0, void 0, void 0, function () {
    var accountInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.getAccountInfo(new web3_js_1.PublicKey(candyMachineId))];
            case 1:
                accountInfo = _a.sent();
                if (accountInfo.owner.toString() === CANDY_MACHINE_V1_PROGRAM.toString()) {
                    return [2 /*return*/, 'v1'];
                }
                if (accountInfo.owner.toString() === CANDY_MACHINE_V2_PROGRAM.toString()) {
                    return [2 /*return*/, 'v2'];
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.getCandyMachineVersion = getCandyMachineVersion;
// Get Candy Machine V2 Creator
var getCandyMachineV2Creator = function (candyMachineId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (web3_js_1.PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachineId.toBuffer()], CANDY_MACHINE_V2_PROGRAM))
            // Get Mint Address
        ];
    });
}); };
exports.getCandyMachineV2Creator = getCandyMachineV2Creator;
// Get Mint Address
var getMintAddress = function (firstCreatorAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var firstPubKey, metadataAccounts, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                firstPubKey = new web3_js_1.PublicKey(firstCreatorAddress);
                return [4 /*yield*/, connection.getProgramAccounts(TOKEN_METADATA_PROGRAM, {
                        dataSlice: { offset: 33, length: 32 },
                        filters: [
                            { dataSize: MAX_METADATA_LEN },
                            {
                                memcmp: {
                                    offset: CREATOR_ARRAY_START,
                                    bytes: firstPubKey.toBase58(),
                                },
                            },
                        ],
                    })];
            case 1:
                metadataAccounts = _a.sent();
                return [2 /*return*/, metadataAccounts.map(function (metadataAccountInfo) { return (bytes_1.bs58.encode(metadataAccountInfo.account.data)); })];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMintAddress = getMintAddress;
var fetchMintAddress = function (candyMachineId) { return __awaiter(void 0, void 0, void 0, function () {
    var candymachinPubkey, candyVersion, creator, candyMachineCreator, tokenIds, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                candymachinPubkey = new web3_js_1.PublicKey(candyMachineId);
                console.log("Program Id:", candymachinPubkey);
                return [4 /*yield*/, (0, exports.getCandyMachineVersion)(candymachinPubkey)];
            case 1:
                candyVersion = _a.sent();
                console.log(candyVersion);
                if (!candyVersion) {
                    return [2 /*return*/];
                }
                creator = candymachinPubkey;
                if (!(candyVersion == 'v2')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.getCandyMachineV2Creator)(candymachinPubkey)];
            case 2:
                candyMachineCreator = _a.sent();
                if (!candyMachineCreator[0]) {
                    console.log('Your program id not valid...');
                    return [2 /*return*/];
                }
                creator = candyMachineCreator[0];
                _a.label = 3;
            case 3:
                console.log('creator', creator);
                return [4 /*yield*/, (0, exports.getMintAddress)(creator.toString())];
            case 4:
                tokenIds = _a.sent();
                return [2 /*return*/, tokenIds];
            case 5:
                error_1 = _a.sent();
                console.log('error', error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.fetchMintAddress = fetchMintAddress;

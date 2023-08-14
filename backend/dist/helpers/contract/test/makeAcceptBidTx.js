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
var nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var web3_js_1 = require("@solana/web3.js");
var connection_1 = require("../../solana/connection");
var __1 = require("..");
var dev_1 = require("../../../config/dev");
var connection = new web3_js_1.Connection(dev_1.CLUSTER_API);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sellerKeypair, bidder, mint, tokenFrom, wallet, keypair, vault, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sellerKeypair = web3_js_1.Keypair.fromSecretKey(bytes_1.bs58.decode('CTDxo5UVojgVRJQTG6aKTb2mbyxtBmpYWAZwMDMjDtKVBQs5wRJTe475YJYsdtxTtAghhNCudvzTyuDxEetQvDa'));
                bidder = new web3_js_1.PublicKey('44ZbLk2K77k44fYS93tJwAMD1UbCWoTEK2PYRGjEsJmH');
                mint = new web3_js_1.PublicKey('ACQiDtfYDEjqNgVPqB15mKndCgqJWyLQDtqPUpX5pVuT');
                tokenFrom = new web3_js_1.PublicKey('BvrAWfyKaFNBrM9VcpoHCxB2yc75sGEaKkNMs478b9Rw');
                wallet = new nodewallet_1.default(sellerKeypair);
                keypair = [185, 162, 183, 188, 89, 224, 44, 92, 1, 139, 59, 53, 105, 164, 18, 172, 245, 118, 222, 141, 29, 182, 129, 78, 89, 51, 135, 61, 125, 207, 165, 196, 238, 136, 210, 175, 250, 61, 245, 210, 43, 204, 180, 110, 194, 233, 137, 21, 250, 164, 80, 247, 143, 116, 139, 88, 44, 158, 128, 140, 55, 154, 167, 9];
                vault = web3_js_1.Keypair.fromSeed(Uint8Array.from(keypair).slice(0, 32));
                return [4 /*yield*/, (0, __1.makeAcceptBidTx)({
                        seller: sellerKeypair.publicKey,
                        bidder: bidder,
                        mint: mint,
                        tokenFrom: tokenFrom,
                        vault: vault
                    })];
            case 1:
                tx = _a.sent();
                // sign and send transaction
                return [4 /*yield*/, (0, connection_1.signAndSendTransaction)(connection, wallet, tx)];
            case 2:
                // sign and send transaction
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLUSTER_API = exports.KEYPAIR = exports.BID_SEED = exports.POOL_SEED = exports.PROGRAM_ID = void 0;
var devnet_json_1 = __importDefault(require("./devnet.json"));
exports.PROGRAM_ID = '4NkEmqohQGvZo191pHG117LYGHm26rdp3TsdSDML1NGq';
exports.POOL_SEED = 'pool';
exports.BID_SEED = 'bid';
exports.KEYPAIR = devnet_json_1.default;
exports.CLUSTER_API = 'https://metaplex.devnet.rpcpool.com';

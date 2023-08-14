"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_PORT = exports.CLUSTER_API = exports.JWT_SECRET = exports.PORT = exports.PG_PASSWORD = exports.PG_DATABASE = exports.PG_USER = exports.PG_HOST = exports.KEYPAIR = exports.VAULT_SEED = exports.BID_SEED = exports.DELEGATE_SEED = exports.PROGRAM_ID = exports.BACKEND_ERROR = exports.BAD_REQUEST = exports.jwtConfig = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var devnet_json_1 = __importDefault(require("./devnet.json"));
exports.jwtConfig = {
    secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '30m',
    refreshTokenExpireTime: '30m'
};
exports.BAD_REQUEST = { success: false, message: 'Bad Request', data: null };
exports.BACKEND_ERROR = { success: false, message: 'Backend Server Error!', data: null };
exports.PROGRAM_ID = '4NkEmqohQGvZo191pHG117LYGHm26rdp3TsdSDML1NGq';
exports.DELEGATE_SEED = 'delegate';
exports.BID_SEED = 'bid';
exports.VAULT_SEED = 'vault';
exports.KEYPAIR = devnet_json_1.default;
exports.PG_HOST = (_a = process.env, _a.PG_HOST), exports.PG_USER = _a.PG_USER, exports.PG_DATABASE = _a.PG_DATABASE, exports.PG_PASSWORD = _a.PG_PASSWORD, exports.PORT = _a.PORT, exports.JWT_SECRET = _a.JWT_SECRET, exports.CLUSTER_API = _a.CLUSTER_API;
exports.PG_PORT = 5432;

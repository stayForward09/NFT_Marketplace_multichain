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
var activity_1 = __importDefault(require("../services/activity"));
var collection_1 = __importDefault(require("../services/collection"));
var config_1 = require("../config");
var sequelize_1 = __importDefault(require("sequelize"));
var Op = sequelize_1.default.Op;
// User Panel
var getMyActivities = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAddress, limit, currentPage, condition, result, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, walletAddress = _a.walletAddress, limit = _a.limit, currentPage = _a.currentPage;
                if (walletAddress === undefined || limit === undefined || currentPage === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                condition = {
                    where: (_b = {},
                        _b[Op.or] = [
                            { from: walletAddress },
                            { to: walletAddress }
                        ],
                        _b),
                    order: [['created_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, activity_1.default.findAndCountAll(condition)];
            case 1:
                result = _c.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: result, message: 'Success' })];
            case 2:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getNftActivities = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mintAddress, limit, currentPage, condition, result, err_2;
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
                        mintAddress: mintAddress
                    },
                    order: [['created_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, activity_1.default.findAndCountAll(condition)];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: result, message: 'Success' })];
            case 2:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getCollectionActivities = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, symbol, limit, currentPage, collection, condition, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, symbol = _a.symbol, limit = _a.limit, currentPage = _a.currentPage;
                if (symbol === undefined || limit === undefined || currentPage === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                return [4 /*yield*/, collection_1.default.findOne({ where: { symbol: symbol } })];
            case 1:
                collection = _b.sent();
                condition = {
                    where: {
                        collectionId: collection.id
                    },
                    order: [['created_at', 'DESC']],
                    limit: limit,
                    offset: (currentPage - 1) * limit
                };
                return [4 /*yield*/, activity_1.default.findAndCountAll(condition)];
            case 2:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: result, message: 'Success' })];
            case 3:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 4: return [2 /*return*/];
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
                                mintAddress: (_b = {},
                                    _b[Op.like] = "%".concat(params.searchValue, "%"),
                                    _b)
                            },
                            {
                                name: (_c = {},
                                    _c[Op.like] = "%".concat(params.searchValue, "%"),
                                    _c)
                            }
                        ],
                        _a),
                    order: [[params.column, params.direction]],
                    limit: params.rowsPerPage,
                    offset: (params.currentPage - 1) * params.rowsPerPage
                };
                return [4 /*yield*/, activity_1.default.findAndCountAll(condition)];
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
                return [4 /*yield*/, activity_1.default.create(data)];
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
                return [4 /*yield*/, activity_1.default.update(data, { where: { id: data.id } })];
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
                return [4 /*yield*/, activity_1.default.destroy({ where: { id: id } })];
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
    getMyActivities: getMyActivities,
    getNftActivities: getNftActivities,
    getCollectionActivities: getCollectionActivities,
    // Admin Panel
    getData: getData,
    addEvent: addEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};

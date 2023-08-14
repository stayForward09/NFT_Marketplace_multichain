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
var httpStatusCode_1 = require("../constants/httpStatusCode");
var collection_1 = __importDefault(require("../services/collection"));
var nft_1 = __importDefault(require("../services/nft"));
var hashlist_1 = __importDefault(require("../services/hashlist"));
var utils_1 = require("../utils");
var config_1 = require("../config");
var fs_1 = __importDefault(require("fs"));
var sequelize_1 = __importDefault(require("sequelize"));
var Op = sequelize_1.default.Op;
var config_2 = require("../config");
var candyMachine_1 = require("../helpers/web3/candyMachine");
var solana_1 = require("../helpers/solana");
var solanaClient = new solana_1.SolanaClient({ rpcEndpoint: config_2.CLUSTER_API });
// User Panel
var getPopularCollections = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var condition, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                condition = {
                    where: {
                        isPopular: true,
                        status: 1
                    },
                    limit: 10
                };
                return [4 /*yield*/, collection_1.default.findAndCountAll(condition)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json({ success: true, data: result, message: 'Success' })];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getAllCollections = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var condition, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                condition = {
                    where: {
                        status: 1
                    }
                };
                return [4 /*yield*/, collection_1.default.findAndCountAll(condition)];
            case 1:
                result = _a.sent();
                res.status(httpStatusCode_1.HTTP_STATUS_CODE.OK).json((0, utils_1.getFormattedResponse)(result, req.method));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Pagnation 
var getCollectionBySymbol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, symbol, price, sort, attributes, offset, limit, search, condition1, collection, nfts, orderBy, sortType, filters_1, condition2, err_3;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                _a = req.body, symbol = _a.symbol, price = _a.price, sort = _a.sort, attributes = _a.attributes, offset = _a.offset, limit = _a.limit, search = _a.search;
                condition1 = {
                    where: {
                        symbol: symbol,
                        status: 1
                    }
                };
                return [4 /*yield*/, collection_1.default.findOne(condition1)];
            case 1:
                collection = _e.sent();
                nfts = void 0;
                if (!(collection !== null)) return [3 /*break*/, 3];
                orderBy = void 0, sortType = void 0;
                switch (sort) {
                    case 'recent':
                        {
                            orderBy = 'updated_at';
                            sortType = 'DESC';
                        }
                        break;
                    case 'price_low_to_high':
                        {
                            orderBy = 'price';
                            sortType = 'ASC';
                        }
                        break;
                    case 'price_high_to_low':
                        {
                            orderBy = 'price';
                            sortType = 'DESC';
                        }
                        break;
                }
                filters_1 = (_b = {},
                    _b[Op.and] = [],
                    _b);
                attributes.map(function (attr, index) {
                    var _a;
                    var filter = (_a = {},
                        _a[Op.or] = [],
                        _a);
                    attr.value.map(function (val, index) {
                        var _a;
                        filter[Op.or].push({
                            attributes: (_a = {},
                                _a[Op.contains] = [{
                                        "trait_type": attr.trait_type,
                                        "value": val
                                    }],
                                _a)
                        });
                    });
                    filters_1[Op.and].push(filter);
                });
                condition2 = {
                    where: __assign({ collectionId: collection.id, status: 1, price: (_c = {},
                            _c[Op.gte] = price.min,
                            _c[Op.lte] = price.max,
                            _c), name: (_d = {},
                            _d[Op.like] = "%".concat(search, "%"),
                            _d) }, filters_1),
                    order: [[orderBy, sortType]],
                    limit: limit,
                    offset: offset
                };
                return [4 /*yield*/, nft_1.default.findAndCountAll(condition2)];
            case 2:
                nfts = _e.sent();
                _e.label = 3;
            case 3:
                return [2 /*return*/, res.status(200).json({ success: true, data: { collection: collection, nfts: nfts }, message: 'Success' })];
            case 4:
                err_3 = _e.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 5: return [2 /*return*/];
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
                                name: (_b = {},
                                    _b[Op.like] = "%".concat(params.searchValue, "%"),
                                    _b)
                            },
                            {
                                symbol: (_c = {},
                                    _c[Op.like] = "%".concat(params.searchValue, "%"),
                                    _c)
                            }
                        ],
                        _a),
                    order: [[params.column, params.direction]],
                    limit: params.rowsPerPage,
                    offset: (params.currentPage - 1) * params.rowsPerPage
                };
                return [4 /*yield*/, collection_1.default.findAndCountAll(condition)];
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
    var data, dir, baseImage, index, format, name_1, hashlist, i, temp, attributes_1, collectibles, nftNameArray, nftName, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                data = req.body.data;
                if (data === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                data = JSON.parse(data);
                if (!(req.files !== null)) return [3 /*break*/, 2];
                dir = "".concat(__dirname, "/../build");
                if (!fs_1.default.existsSync(dir)) {
                    fs_1.default.mkdirSync(dir);
                }
                if (!fs_1.default.existsSync("".concat(dir, "/uploads"))) {
                    fs_1.default.mkdirSync("".concat(dir, "/uploads"));
                }
                baseImage = req.files.baseImage;
                if (!(baseImage !== undefined)) return [3 /*break*/, 2];
                index = baseImage['name'].lastIndexOf('.');
                format = baseImage['name'].substring(index, baseImage['name'].length);
                name_1 = new Date().getTime().toString() + format;
                return [4 /*yield*/, baseImage.mv("".concat(dir, "/uploads/").concat(name_1))];
            case 1:
                _a.sent();
                data['baseImage'] = '/uploads/' + name_1;
                _a.label = 2;
            case 2:
                data['status'] = 0;
                delete data.id;
                hashlist = [];
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < data['creators'].length)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, candyMachine_1.getMintAddress)(data['creators'][i])];
            case 4:
                temp = _a.sent();
                hashlist = __spreadArray(__spreadArray([], hashlist, true), temp, true);
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                attributes_1 = [];
                return [4 /*yield*/, solanaClient.getAllCollectiblesFromHashList(hashlist, [])];
            case 7:
                collectibles = _a.sent();
                collectibles.nfts.map(function (nft, index) {
                    if (nft.attributes !== undefined) {
                        nft.attributes.map(function (attr, index) {
                            var filterArr = attributes_1.filter(function (newAttr, index) { return newAttr.trait_type === attr.trait_type; });
                            if (filterArr.length > 0) {
                                var indexNum = attributes_1.indexOf(filterArr[0]);
                                if (attributes_1[indexNum].value.indexOf(attr.value) === -1) {
                                    attributes_1[indexNum] = __assign(__assign({}, attributes_1[indexNum]), { value: __spreadArray(__spreadArray([], attributes_1[indexNum].value, true), [
                                            attr.value
                                        ], false) });
                                }
                            }
                            else {
                                attributes_1.push({
                                    trait_type: attr.trait_type,
                                    value: [
                                        attr.value
                                    ]
                                });
                            }
                        });
                    }
                });
                data['attributes'] = attributes_1;
                nftNameArray = collectibles.nfts[0].data.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                data['nftName'] = nftName;
                return [4 /*yield*/, collection_1.default.create(data)];
            case 8:
                result = _a.sent();
                return [4 /*yield*/, hashlist_1.default.create({
                        collectionId: result.id,
                        nftName: nftName,
                        hashlist: hashlist
                    })];
            case 9:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 10:
                e_2 = _a.sent();
                console.log('error: ', e_2);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 11: return [2 /*return*/];
        }
    });
}); };
var updateEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dir, baseImage, index, format, name_2, hashlist, i, temp, collectibles, attributes_2, nftNameArray, nftName, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                data = req.body.data;
                if (data === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                data = JSON.parse(data);
                if (!(req.files !== null)) return [3 /*break*/, 2];
                dir = "".concat(__dirname, "/../build");
                if (!fs_1.default.existsSync(dir)) {
                    fs_1.default.mkdirSync(dir);
                }
                if (!fs_1.default.existsSync("".concat(dir, "/uploads"))) {
                    fs_1.default.mkdirSync("".concat(dir, "/uploads"));
                }
                baseImage = req.files.baseImage;
                if (!(baseImage !== undefined)) return [3 /*break*/, 2];
                index = baseImage['name'].lastIndexOf('.');
                format = baseImage['name'].substring(index, baseImage['name'].length);
                name_2 = new Date().getTime().toString() + format;
                return [4 /*yield*/, baseImage.mv("".concat(dir, "/uploads/").concat(name_2))];
            case 1:
                _a.sent();
                data['baseImage'] = '/uploads/' + name_2;
                _a.label = 2;
            case 2:
                hashlist = [];
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < data['creators'].length)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, candyMachine_1.getMintAddress)(data['creators'][i])];
            case 4:
                temp = _a.sent();
                hashlist = __spreadArray(__spreadArray([], hashlist, true), temp, true);
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, solanaClient.getAllCollectiblesFromHashList(hashlist, [])];
            case 7:
                collectibles = _a.sent();
                attributes_2 = [];
                collectibles.nfts.map(function (nft, index) {
                    if (nft.attributes !== undefined) {
                        nft.attributes.map(function (attr, index) {
                            var filterArr = attributes_2.filter(function (newAttr, index) { return newAttr.trait_type === attr.trait_type; });
                            if (filterArr.length > 0) {
                                var indexNum = attributes_2.indexOf(filterArr[0]);
                                if (attributes_2[indexNum].value.indexOf(attr.value) === -1) {
                                    attributes_2[indexNum] = __assign(__assign({}, attributes_2[indexNum]), { value: __spreadArray(__spreadArray([], attributes_2[indexNum].value, true), [
                                            attr.value
                                        ], false) });
                                }
                            }
                            else {
                                attributes_2.push({
                                    trait_type: attr.trait_type,
                                    value: [
                                        attr.value
                                    ]
                                });
                            }
                        });
                    }
                });
                data['attributes'] = attributes_2;
                nftNameArray = collectibles.nfts[0].data.name.split(" ");
                nftName = nftNameArray.slice(0, nftNameArray.length - 1).join('_').toLowerCase();
                data['nftName'] = nftName;
                return [4 /*yield*/, hashlist_1.default.update({
                        collectionId: data.id,
                        nftName: nftName,
                        hashlist: hashlist
                    }, { where: { collectionId: data.id } })];
            case 8:
                _a.sent();
                return [4 /*yield*/, collection_1.default.update(data, { where: { id: data.id } })];
            case 9:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 10:
                e_3 = _a.sent();
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 11: return [2 /*return*/];
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
                return [4 /*yield*/, collection_1.default.destroy({ where: { id: id } })];
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
var approveEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (id === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                return [4 /*yield*/, collection_1.default.update({ status: 1 }, { where: { id: id } })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var rejectEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (id === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                return [4 /*yield*/, collection_1.default.update({ status: 2 }, { where: { id: id } })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: true, message: 'Success', data: result })];
            case 2:
                e_6 = _a.sent();
                console.log(e_6);
                return [2 /*return*/, res.status(500).json(config_1.BACKEND_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    // User Panel
    getPopularCollections: getPopularCollections,
    getAllCollections: getAllCollections,
    getCollectionBySymbol: getCollectionBySymbol,
    // Admin Panel
    getData: getData,
    addEvent: addEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    approveEvent: approveEvent,
    rejectEvent: rejectEvent
};

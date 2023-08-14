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
var admin_1 = __importDefault(require("../services/admin"));
var config_1 = require("../config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_2 = require("../config");
var data = {
    users: [
        {
            id: 1,
            fullName: 'Sales Bot',
            username: 'salesbot',
            password: 'admin',
            avatar: '',
            email: 'admin@demo.com',
            role: 'admin',
            ability: [
                {
                    action: 'manage',
                    subject: 'all'
                }
            ],
            extras: {
                eCommerceCartItemsCount: 5
            }
        },
        {
            id: 2,
            fullName: 'Discord Bot',
            username: 'discordbot',
            password: 'client',
            avatar: '',
            email: 'client@demo.com',
            role: 'client',
            ability: [
                {
                    action: 'read',
                    subject: 'ACL'
                },
                {
                    action: 'read',
                    subject: 'Auth'
                }
            ],
            extras: {
                eCommerceCartItemsCount: 5
            }
        }
    ]
};
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, error, defaultAdmin, user, admin, accessToken, refreshToken, userData, response, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                if (email === undefined || password === undefined) {
                    return [2 /*return*/, res.status(400).json(config_1.BAD_REQUEST)];
                }
                error = {
                    email: ['Something went wrong']
                };
                return [4 /*yield*/, admin_1.default.findOne({ where: { email: 'admin@submarine.com' } })];
            case 1:
                defaultAdmin = _b.sent();
                if (!(defaultAdmin === null)) return [3 /*break*/, 3];
                return [4 /*yield*/, admin_1.default.create({
                        "fullName": "Submarine Admin",
                        "username": "Submarine",
                        "password": "admin",
                        "avatar": "",
                        "email": "admin@submarine.com",
                        "role": "admin",
                        "ability": [
                            {
                                "action": "manage",
                                "subject": "all"
                            }
                        ]
                    })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, admin_1.default.findOne({ where: { email: email, password: password } })];
            case 4:
                user = _b.sent();
                if (user !== null) {
                    admin = user.toJSON();
                    try {
                        accessToken = jsonwebtoken_1.default.sign({ id: admin.id }, config_2.jwtConfig.secret, { expiresIn: config_2.jwtConfig.expireTime });
                        refreshToken = jsonwebtoken_1.default.sign({ id: admin.id }, config_2.jwtConfig.refreshTokenSecret, {
                            expiresIn: config_2.jwtConfig.refreshTokenExpireTime
                        });
                        userData = __assign({}, admin);
                        delete userData.password;
                        response = {
                            userData: userData,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        };
                        return [2 /*return*/, res.json(response)];
                    }
                    catch (e) {
                        error = e;
                    }
                }
                else {
                    error = {
                        email: ['Email or Password is Invalid']
                    };
                }
                return [2 /*return*/, res.status(400).json({ success: false, message: error, data: null })];
            case 5:
                e_1 = _b.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var changeAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userData = req.body.userData;
                if (userData === undefined) {
                    return [2 /*return*/, res.json({ success: false, data: null, message: 'Paramater is required!' })];
                }
                return [4 /*yield*/, admin_1.default.findOne({
                        where: {
                            email: userData.email
                        }
                    })];
            case 1:
                user = _a.sent();
                if (user === null) {
                    return [2 /*return*/, res.json(user)];
                }
                if (userData.cPassword !== '') {
                    if (userData.nPassword !== userData.mPassword) {
                        return [2 /*return*/, res.json({ success: false, data: null, message: 'New passwords do not match!' })];
                    }
                    if (userData.cPassword !== user.password) {
                        return [2 /*return*/, res.json({ success: false, data: null, message: 'Current Password is not correct!' })];
                    }
                    user.password = userData.nPassword;
                }
                user.fullName = userData.fullName;
                user.username = userData.username;
                user.email = userData.email;
                user.save();
                return [2 /*return*/, res.json({ success: true, data: null, message: 'Account successfully changed.' })];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [2 /*return*/, res.status(500).json({ success: false, data: null, message: 'Backend Server Failed!' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const register = async (req: Request, res: Response) => {
//   if (!!req.body.email) {
//     const { email, password, username } = req.body
//     const isEmailAlreadyInUse = data.users.find(user => user.email === email)
//     const isUsernameAlreadyInUse = data.users.find(user => user.username === username)
//     const error = {
//       email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
//       username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
//     }
//     if (!error.username && !error.email) {
//       const userData = {
//         email,
//         password,
//         username,
//         fullName: '',
//         avatar: null,
//         role: 'admin',
//         ability: [
//           {
//             action: 'manage',
//             subject: 'all'
//           }
//         ]
//       }
//       // Add user id
//       const length = data.users.length
//       let lastIndex = 0
//       if (length) {
//         lastIndex = data.users[length - 1].id
//       }
//       userData.id = lastIndex + 1
//       data.users.push(userData)
//       const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
//       const user = Object.assign({}, userData)
//       delete user['password']
//       const response = { user, accessToken }
//       return res.json(response)
//     } else {
//       return res.json(error)
//     }
//   }
// }
// const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body
//   try {
//     const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)
//     const userData = { ...data.users.find(user => user.id === id) }
//     const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
//     const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
//       expiresIn: jwtConfig.refreshTokenExpireTime
//     })
//     delete userData.password
//     const response = {
//       userData,
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken
//     }
//     return res.json(response)
//   } catch (e) {
//     const error = 'Invalid refresh token'
//     return res.status(401).json(error)
//   }
// }
exports.default = {
    login: login,
    // register,
    // refreshToken,
    changeAccount: changeAccount
};

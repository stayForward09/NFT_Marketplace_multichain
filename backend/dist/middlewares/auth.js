"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var authenticate = function (req, res) {
    var token = req.headers.authorization || '';
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) {
            res.status(401).json({ error: "Your authentication invalid." });
        }
        else {
            // const { expiredAt, email } = decoded
            // if (expiredAt > new Date().getTime()) {
            //   req.email = email
            //   req.token = token
            //   next();
            // } else {
            //   res.status(401).json({ error: "Login Expired!. Please log back into the platform." })
            // }
        }
    });
};
var authError = function (err, req, res, next) {
    res.json(err);
};
exports.default = {
    authenticate: authenticate,
    authError: authError
};

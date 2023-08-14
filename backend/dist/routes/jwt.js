"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import { authenticate, authError } from '../../middlewares/auth'
var jwt_1 = __importDefault(require("../controllers/jwt"));
var router = (0, express_1.Router)();
router.post('/login', jwt_1.default.login);
router.post('/changeAccount', jwt_1.default.changeAccount);
// router.post('/register', ctrl.register)
// router.post('/refresh-token', ctrl.refreshToken)
exports.default = router;

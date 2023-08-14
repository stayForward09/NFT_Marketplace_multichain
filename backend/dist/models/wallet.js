"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var WalletSchema = sequelize.db.define("wallets", {
    walletAddress: {
        type: sequelize_1.default.STRING,
        primaryKey: true,
        unique: true,
    },
    vault: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
}, {
    tableName: "wallets",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
})
    .then(function (jane) {
});
exports.default = WalletSchema;

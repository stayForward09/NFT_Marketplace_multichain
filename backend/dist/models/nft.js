"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var NftSchema = sequelize.db.define("nfts", {
    mintAddress: {
        type: sequelize_1.default.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    walletAddress: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    tokenAccount: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    collectionId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    attributes: {
        type: sequelize_1.default.JSONB,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        defaultValue: 1, // 1 : listed, 2: unlisted
    },
}, {
    tableName: "nfts",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
})
    .then(function (jane) {
});
exports.default = NftSchema;

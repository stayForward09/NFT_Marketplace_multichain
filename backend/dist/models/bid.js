"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var BidSchema = sequelize.db.define("bids", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    image: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    walletAddress: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    mintAddress: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    tokenAccount: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    offerPrice: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
        min: 0
    },
    currentPrice: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
        min: 0
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {
    tableName: "bids",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
})
    .then(function (jane) {
});
exports.default = BidSchema;

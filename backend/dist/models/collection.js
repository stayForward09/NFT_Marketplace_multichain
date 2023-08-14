"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var CollectionSchema = sequelize.db.define("collections", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    symbol: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    nftName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    creators: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.STRING),
    },
    attributes: {
        type: sequelize_1.default.JSONB,
    },
    totalSupply: {
        type: sequelize_1.default.INTEGER,
    },
    launchDate: {
        type: sequelize_1.default.DATE,
    },
    description: {
        type: sequelize_1.default.TEXT,
    },
    baseImage: {
        type: sequelize_1.default.STRING,
    },
    twitterLink: {
        type: sequelize_1.default.STRING,
    },
    discordLink: {
        type: sequelize_1.default.STRING,
    },
    websiteLink: {
        type: sequelize_1.default.STRING,
    },
    isNew: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isUpcoming: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isPopular: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    isDraft: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
}, {
    tableName: "collections",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) { })
    .then(function (jane) { });
exports.default = CollectionSchema;

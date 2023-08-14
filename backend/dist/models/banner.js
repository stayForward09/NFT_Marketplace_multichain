"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var BannerSchema = sequelize.db.define("banners", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    title: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    actionName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    actionLink: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    baseImage: {
        type: sequelize_1.default.STRING,
    },
    bannerImage: {
        type: sequelize_1.default.STRING,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 1,
        allowNull: false,
    }
}, {
    tableName: "banners",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
})
    .then(function (jane) {
});
exports.default = BannerSchema;

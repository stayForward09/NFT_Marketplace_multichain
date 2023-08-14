"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var HashListSchema = sequelize.db.define("hashlists", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    collectionId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        unique: true
    },
    nftName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    },
    hashlist: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.STRING),
    }
}, {
    tableName: "hashlists",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) { })
    .then(function (jane) { });
exports.default = HashListSchema;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var ActivitySchema = sequelize.db.define("activity", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    collectionId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    mintAddress: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
    },
    from: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    to: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    signature: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 1,
        allowNull: false,
    }
}, {
    tableName: "activity",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) { })
    .then(function (jane) { });
exports.default = ActivitySchema;

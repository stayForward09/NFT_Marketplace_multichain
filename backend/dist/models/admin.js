"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var AdminSchema = sequelize.db.define("admins", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    fullName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.default.STRING,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    ability: {
        type: sequelize_1.default.JSONB,
    }
}, {
    tableName: "admins",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
})
    .then(function (jane) {
});
exports.default = AdminSchema;

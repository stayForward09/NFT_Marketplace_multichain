"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../utils/db"));
var sequelize_1 = __importDefault(require("sequelize"));
var sequelize = new db_1.default();
var SettingSchema = sequelize.db.define("settings", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    key: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    value: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
}, {
    tableName: "settings",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
sequelize.db
    .sync({ force: false })
    .then(function (data) {
    // console.log('Setting DB', data)
})
    .then(function (jane) {
    // console.log('Setting jane', jane)
});
exports.default = SettingSchema;

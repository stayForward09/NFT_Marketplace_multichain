"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var sequelize_1 = require("sequelize");
var DB = /** @class */ (function () {
    function DB() {
        try {
            var sequelize = new sequelize_1.Sequelize(config_1.PG_DATABASE, config_1.PG_USER, config_1.PG_PASSWORD, {
                host: config_1.PG_HOST,
                dialect: "postgres",
                pool: { max: 5, min: 0, idle: 1000 },
                logging: false,
                port: config_1.PG_PORT,
            });
            this.db = sequelize;
        }
        catch (err) {
            console.log('err-->', err);
            process.exit();
        }
    }
    return DB;
}());
exports.default = DB;

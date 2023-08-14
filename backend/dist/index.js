"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(upload.array())
app.use((0, express_fileupload_1.default)());
app.use('/api', routes_1.default);
// app.use(express.static(path.join(__dirname, "uploads")))
app.use(express_1.default.static("".concat(__dirname, "/build")));
app.use('/*', function (req, res) {
    res.sendFile("".concat(__dirname, "/build/index.html"));
});
var port = process.env.PORT || 5001;
app.listen(port, function () {
    console.info("server started on port ".concat(port)); // eslint-disable-line no-console
});

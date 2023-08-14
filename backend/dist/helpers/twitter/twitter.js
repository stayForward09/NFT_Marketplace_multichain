"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequest = exports.accessToken = exports.requestToken = void 0;
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
var OAuth = require('oauth-1.0a');
var querystring_1 = __importDefault(require("querystring"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
var consumer_key = process.env.CONSUMER_KEY;
var consumer_secret = process.env.CONSUMER_SECRET;
// const consumer_key = 'iDstsciPU9Bh6LPybGcNDxdAM'
// const consumer_secret = '902xOLKsOr9HEsfJE6zDGmleV0ugSzxdjkmdHSXstDPhLaRp9u'
// Be sure to add replace the text of the with the text you wish to Tweet.
// You can also add parameters to post polls, quote Tweets, Tweet with reply settings, and Tweet to Super Followers in addition to other features.
var endpointURL = "https://api.twitter.com/2/tweets";
// this example uses PIN-based OAuth to authorize the user
var requestTokenURL = "https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write";
var authorizeURL = new URL("https://api.twitter.com/oauth/authorize");
var accessTokenURL = "https://api.twitter.com/oauth/access_token";
var oauth = OAuth({
    consumer: {
        key: consumer_key,
        secret: consumer_secret
    },
    signature_method: "HMAC-SHA1",
    hash_function: function (baseString, key) { return crypto_1.default.createHmac("sha1", key).update(baseString).digest("base64"); }
});
function requestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var authHeader, req;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authHeader = oauth.toHeader(oauth.authorize({
                        url: requestTokenURL,
                        method: "POST"
                    }));
                    return [4 /*yield*/, axios_1.default.post(requestTokenURL, {}, {
                            headers: {
                                Authorization: authHeader["Authorization"]
                            }
                        })];
                case 1:
                    req = _a.sent();
                    if (req.data) {
                        return [2 /*return*/, querystring_1.default.parse(req.data)];
                    }
                    else {
                        throw new Error("Cannot get an OAuth request token");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.requestToken = requestToken;
function accessToken(_a, verifier) {
    var oauth_token = _a.oauth_token, oauth_token_secret = _a.oauth_token_secret;
    return __awaiter(this, void 0, void 0, function () {
        var authHeader, path, req;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    authHeader = oauth.toHeader(oauth.authorize({
                        url: accessTokenURL,
                        method: "POST"
                    }));
                    path = "https://api.twitter.com/oauth/access_token?oauth_verifier=".concat(verifier, "&oauth_token=").concat(oauth_token);
                    return [4 /*yield*/, axios_1.default.post(path, {}, {
                            headers: {
                                Authorization: authHeader["Authorization"]
                            }
                        })];
                case 1:
                    req = _b.sent();
                    if (req.data) {
                        return [2 /*return*/, querystring_1.default.parse(req.data)];
                    }
                    else {
                        throw new Error("Cannot get an OAuth request token");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.accessToken = accessToken;
function getRequest(_a) {
    var oauth_token = _a.oauth_token, oauth_token_secret = _a.oauth_token_secret;
    return __awaiter(this, void 0, void 0, function () {
        var token, authHeader, data, req;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = {
                        key: oauth_token,
                        secret: oauth_token_secret
                    };
                    authHeader = oauth.toHeader(oauth.authorize({
                        url: endpointURL,
                        method: "POST"
                    }, token));
                    data = {
                        text: "Testing",
                    };
                    return [4 /*yield*/, axios_1.default.post(endpointURL, data, {
                            headers: {
                                Authorization: authHeader["Authorization"],
                                "user-agent": "v2CreateTweetJS",
                                "content-type": "application/json",
                                accept: "application/json"
                            }
                        })];
                case 1:
                    req = _b.sent();
                    if (req.data) {
                        return [2 /*return*/, req.data];
                    }
                    else {
                        throw new Error("Unsuccessful request");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getRequest = getRequest;

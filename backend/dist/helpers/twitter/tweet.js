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
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var twit = require('twit');
// const twitterConfig = {
//     consumer_key: 'iDstsciPU9Bh6LPybGcNDxdAM',
//     consumer_secret: '902xOLKsOr9HEsfJE6zDGmleV0ugSzxdjkmdHSXstDPhLaRp9u',
//     access_token: '1505941202084175873-FfiJYlb4GzaRuXqD7L4AZsnrXijdC4',
//     access_token_secret: 'FgSCAEXeTCclhTNgFEF0IsSde2OPaGMRtZZwPa1GOck6S',
// };
var twitterConfig = {
    consumer_key: 'iDstsciPU9Bh6LPybGcNDxdAM',
    consumer_secret: '902xOLKsOr9HEsfJE6zDGmleV0ugSzxdjkmdHSXstDPhLaRp9u',
    access_token: '1478135251268423685-VL2RdkygDrhO0aLfCmIbgpGz24rZOb',
    access_token_secret: 'qATDevi2gHM5XGvZmjspYLM8KmG8rjD8BG8H8yfF9pNqf',
};
// {
//     oauth_token: '1478135251268423685-VL2RdkygDrhO0aLfCmIbgpGz24rZOb',
//     oauth_token_secret: 'qATDevi2gHM5XGvZmjspYLM8KmG8rjD8BG8H8yfF9pNqf',
//     user_id: '1478135251268423685',
//     screen_name: 'PeterPa35439196'
// }
var twitterClient = new twit(twitterConfig);
// Tweet a text-based status
function tweet(tweetText) {
    return __awaiter(this, void 0, void 0, function () {
        var tweet;
        return __generator(this, function (_a) {
            tweet = {
                status: tweetText,
            };
            twitterClient.post('statuses/update', tweet, function (error, tweet, response) {
                if (!error) {
                    console.log("Successfully tweeted: ".concat(tweetText));
                }
                else {
                    console.error(error);
                }
            });
            return [2 /*return*/];
        });
    });
}
// OPTIONAL - use this method if you want the tweet to include the full image file of the OpenSea item in the tweet.
function tweetWithImage(tweetText, imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var processedImage, mediaPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBase64(imageUrl)];
                case 1:
                    processedImage = _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            twitterClient.post('media/upload', { media_data: processedImage }, function (error, media, response) {
                                if (!error) {
                                    twitterClient.post('statuses/update', {
                                        status: tweetText,
                                        media_ids: [media.media_id_string]
                                    }, function (error, tweet, response) {
                                        if (!error) {
                                            resolve(tweet);
                                        }
                                        else {
                                            reject(error);
                                        }
                                    });
                                }
                                else {
                                    reject(error);
                                }
                            });
                        })];
                case 2:
                    mediaPromise = _a.sent();
                    // console.log("tweet: ", media);
                    return [2 /*return*/, mediaPromise];
            }
        });
    });
}
// Format a provided URL into it's base64 representation
function getBase64(url) {
    return axios.get(url, { responseType: 'arraybuffer' }).then(function (response) { return Buffer.from(response.data, 'binary').toString('base64'); });
}
exports.default = {
    tweet: tweet,
    tweetWithImage: tweetWithImage
};

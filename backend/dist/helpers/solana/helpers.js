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
exports.solanaNFTToCollectible = void 0;
/**
 * NFT is a gif if it has a file with MIME type image/gif
 * if it's a gif, we compute an image frame from the gif
 */
var nftGif = function (nft) { return __awaiter(void 0, void 0, void 0, function () {
    var gifFile, url;
    var _a, _b;
    return __generator(this, function (_c) {
        gifFile = ((_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : []).find(function (file) { return typeof file === 'object' && file.type === 'image/gif'; });
        if (gifFile) {
            url = gifFile.uri;
            return [2 /*return*/, {
                    collectibleMediaType: 'GIF',
                    url: url,
                    frameUrl: null
                }];
        }
        return [2 /*return*/, null];
    });
}); };
/**
 * NFT is a 3D object if:
 * - its category is vr, or
 * - it has an animation url that ends in glb, or
 * - it has a file whose type is glb, or
 *
 * if the 3D has a poster/thumbnail, it would be:
 * - either in the image property, or
 * - the properties files with a type of image
 */
var nftThreeDWithFrame = function (nft) { return __awaiter(void 0, void 0, void 0, function () {
    var files, objFile, objUrl, is3DObject, frameUrl, imageFile, url;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        files = (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [];
        objFile = files.find(function (file) { return typeof file === 'object' && file.type.includes('glb'); });
        objUrl = files.find(function (file) { return typeof file === 'string' && file.endsWith('glb'); });
        is3DObject = ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) === 'vr' ||
            ((_d = nft.animation_url) === null || _d === void 0 ? void 0 : _d.endsWith('glb')) ||
            objFile ||
            objUrl;
        if (is3DObject) {
            frameUrl = void 0;
            if (!nft.image.endsWith('glb')) {
                frameUrl = nft.image;
            }
            else {
                imageFile = files === null || files === void 0 ? void 0 : files.find(function (file) { return typeof file === 'object' && file.type.includes('image'); });
                if (imageFile) {
                    frameUrl = imageFile.uri;
                }
            }
            if (frameUrl) {
                url = void 0;
                if (nft.animation_url && nft.animation_url.endsWith('glb')) {
                    url = nft.animation_url;
                }
                else if (objFile) {
                    url = objFile.uri;
                }
                else if (objUrl) {
                    url = objUrl;
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, {
                        collectibleMediaType: 'THREE_D',
                        url: url,
                        frameUrl: frameUrl
                    }];
            }
        }
        return [2 /*return*/, null];
    });
}); };
/**
 * NFT is a video if:
 * - its category is video, or
 * - it has an animation url that does not end in glb, or
 * - it has a file whose type is video, or
 * - it has a file whose url includes watch.videodelivery.net
 *
 * if the video has a poster/thumbnail, it would be in the image property
 * otherwise, we later use the first video frame as the thumbnail
 */
var nftVideo = function (nft) { return __awaiter(void 0, void 0, void 0, function () {
    var files, videoFile, videoUrl, isVideo, url;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        files = (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [];
        videoFile = files.find(function (file) {
            return typeof file === 'object' &&
                file.type.includes('video') &&
                !file.type.endsWith('glb');
        });
        videoUrl = files.find(function (file) {
            return typeof file === 'string' &&
                // https://github.com/metaplex-foundation/metaplex/blob/397ceff70b3524aa0543540584c7200c79b198a0/js/packages/web/src/components/ArtContent/index.tsx#L107
                file.startsWith('https://watch.videodelivery.net/');
        });
        isVideo = ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) === 'video' ||
            (nft.animation_url && !nft.animation_url.endsWith('glb')) ||
            videoFile ||
            videoUrl;
        if (isVideo) {
            url = void 0;
            if (nft.animation_url && !nft.animation_url.endsWith('glb')) {
                url = nft.animation_url;
            }
            else if (videoFile) {
                url = videoFile.uri;
            }
            else if (videoUrl) {
                url = videoUrl;
            }
            else if (files.length) {
                // if there is only one file, then that's the video
                // otherwise, the second file is the video (the other files are image/audio files)
                // https://github.com/metaplex-foundation/metaplex/blob/397ceff70b3524aa0543540584c7200c79b198a0/js/packages/web/src/components/ArtContent/index.tsx#L103
                if (files.length === 1) {
                    url = typeof files[0] === 'object' ? files[0].uri : files[0];
                }
                else {
                    url = typeof files[1] === 'object' ? files[1].uri : files[1];
                }
            }
            else {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, {
                    collectibleMediaType: 'VIDEO',
                    url: url,
                    frameUrl: nft.image || null
                }];
        }
        return [2 /*return*/, null];
    });
}); };
/**
 * NFT is an image if:
 * - its category is image, or
 * - it has a file whose type is image, or
 * - it has an image property
 */
var nftImage = function (nft) { return __awaiter(void 0, void 0, void 0, function () {
    var files, imageFile, isImage, url;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        files = (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [];
        imageFile = files.find(function (file) { return typeof file === 'object' && file.type.includes('image'); });
        isImage = ((_c = nft.properties) === null || _c === void 0 ? void 0 : _c.category) === 'image' || nft.image.length || imageFile;
        if (isImage) {
            url = void 0;
            if (nft.image.length) {
                url = nft.image;
            }
            else if (imageFile) {
                url = imageFile.uri;
            }
            else if (files.length) {
                if (files.length === 1) {
                    url = typeof files[0] === 'object' ? files[0].uri : files[0];
                }
                else {
                    url = typeof files[1] === 'object' ? files[1].uri : files[1];
                }
            }
            else {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, {
                    collectibleMediaType: 'IMAGE',
                    url: url,
                    frameUrl: url
                }];
        }
        return [2 /*return*/, null];
    });
}); };
/**
 * If not easily discoverable tha nft is gif/video/image, we check whether it has files
 * if it does not, then we discard the nft
 * otherwise, we fetch the content type of the first file and check its MIME type:
 * - if gif, we also compute an image frame from it
 * - if video, we later use the first video frame as the thumbnail
 * - if image, the image url is also the frame url
 */
var nftComputedMedia = function (nft) { return __awaiter(void 0, void 0, void 0, function () {
    var files, url, headResponse, contentType;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                files = (_b = (_a = nft.properties) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [];
                if (!files.length) {
                    return [2 /*return*/, null];
                }
                url = typeof files[0] === 'object' ? files[0].uri : files[0];
                return [4 /*yield*/, fetch(url, { method: 'HEAD' })];
            case 1:
                headResponse = _c.sent();
                contentType = headResponse.headers.get('Content-Type');
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('gif')) {
                    // frame url for the gif is computed later in the collectibles page
                    return [2 /*return*/, {
                            collectibleMediaType: 'GIF',
                            url: url,
                            frameUrl: null
                        }];
                }
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('video')) {
                    return [2 /*return*/, {
                            collectibleMediaType: 'VIDEO',
                            url: url,
                            frameUrl: null
                        }];
                }
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('image')) {
                    return [2 /*return*/, {
                            collectibleMediaType: 'IMAGE',
                            url: url,
                            frameUrl: url
                        }];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var metaplexNFTToCollectible = function (nft, address) { return __awaiter(void 0, void 0, void 0, function () {
    var identifier, collectible, _a, url, frameUrl, collectibleMediaType, _b, _c, _d, _e;
    var _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                identifier = [nft.symbol, nft.name, nft.image]
                    .filter(Boolean)
                    .join(':::');
                collectible = {
                    id: identifier,
                    tokenId: identifier,
                    name: nft.name,
                    description: nft.description,
                    externalLink: nft.external_url,
                    isOwned: true,
                    chain: 'sol',
                    creators: (_f = nft.properties) === null || _f === void 0 ? void 0 : _f.creators,
                    attributes: nft.attributes
                };
                if (((_h = (_g = nft.properties) === null || _g === void 0 ? void 0 : _g.creators) !== null && _h !== void 0 ? _h : []).some(function (creator) { return creator.address === address; })) {
                    collectible.isOwned = false;
                }
                return [4 /*yield*/, nftGif(nft)];
            case 1:
                _e = (_j.sent());
                if (_e) return [3 /*break*/, 3];
                return [4 /*yield*/, nftThreeDWithFrame(nft)];
            case 2:
                _e = (_j.sent());
                _j.label = 3;
            case 3:
                _d = _e;
                if (_d) return [3 /*break*/, 5];
                return [4 /*yield*/, nftVideo(nft)];
            case 4:
                _d = (_j.sent());
                _j.label = 5;
            case 5:
                _c = _d;
                if (_c) return [3 /*break*/, 7];
                return [4 /*yield*/, nftImage(nft)];
            case 6:
                _c = (_j.sent());
                _j.label = 7;
            case 7:
                _b = _c;
                if (_b) return [3 /*break*/, 9];
                return [4 /*yield*/, nftComputedMedia(nft)];
            case 8:
                _b = (_j.sent());
                _j.label = 9;
            case 9:
                _a = (_b), url = _a.url, frameUrl = _a.frameUrl, collectibleMediaType = _a.collectibleMediaType;
                collectible.frameUrl = frameUrl;
                collectible.mediaType = collectibleMediaType;
                if (collectibleMediaType === 'GIF') {
                    collectible.gifUrl = url;
                }
                else if (collectibleMediaType === 'THREE_D') {
                    collectible.threeDUrl = url;
                }
                else if (collectibleMediaType === 'VIDEO') {
                    collectible.videoUrl = url;
                }
                else if (collectibleMediaType === 'IMAGE') {
                    collectible.imageUrl = url;
                }
                return [2 /*return*/, collectible];
        }
    });
}); };
var solanaNFTToCollectible = function (nft, address, type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, metaplexNFTToCollectible(nft, address)];
    });
}); };
exports.solanaNFTToCollectible = solanaNFTToCollectible;

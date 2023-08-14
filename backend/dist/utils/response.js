"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedResponse = void 0;
var constants_1 = require("../constants");
var httpStatusCode_1 = require("../constants/httpStatusCode");
var RESPONSE_MESSAGE_FOR_HTTP_METHOD = {
    GET: constants_1.PROCESSED_SUCCESSFUL,
    POST: constants_1.INSERTED_SUCCESS,
    DELETE: constants_1.DELETED_SUCCESS,
    PATCH: constants_1.UPDATED_SUCCESS,
};
var getFormattedResponse = function (response, httpMethod) { return ({
    version: constants_1.VERSION.VERSION1,
    status: httpStatusCode_1.HTTP_STATUS_CODE.OK,
    message: !!response ? RESPONSE_MESSAGE_FOR_HTTP_METHOD[httpMethod] : constants_1.RECORD_NOT_FOUND,
    data: response,
}); };
exports.getFormattedResponse = getFormattedResponse;

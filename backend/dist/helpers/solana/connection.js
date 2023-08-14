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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeATokenAccountTransaction = exports.signAndSendTransaction = exports.makeTransaction = exports.sleep = exports.sendSignedTransaction = exports.getUnixTs = exports.sendTransactionWithRetry = exports.sendTransaction = exports.sendTransactions = exports.sendTransactionsWithManualRetry = exports.SequenceType = exports.getErrorForTransaction = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
var getErrorForTransaction = function (connection, txid) { return __awaiter(void 0, void 0, void 0, function () {
    var tx, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // wait for all confirmation before geting transaction
            return [4 /*yield*/, connection.confirmTransaction(txid, 'max')];
            case 1:
                // wait for all confirmation before geting transaction
                _a.sent();
                return [4 /*yield*/, connection.getParsedConfirmedTransaction(txid)];
            case 2:
                tx = _a.sent();
                errors = [];
                if ((tx === null || tx === void 0 ? void 0 : tx.meta) && tx.meta.logMessages) {
                    tx.meta.logMessages.forEach(function (log) {
                        var regex = /Error: (.*)/gm;
                        var m;
                        while ((m = regex.exec(log)) !== null) {
                            // This is necessary to avoid infinite loops with zero-width matches
                            if (m.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }
                            if (m.length > 1) {
                                errors.push(m[1]);
                            }
                        }
                    });
                }
                return [2 /*return*/, errors];
        }
    });
}); };
exports.getErrorForTransaction = getErrorForTransaction;
var SequenceType;
(function (SequenceType) {
    SequenceType[SequenceType["Sequential"] = 0] = "Sequential";
    SequenceType[SequenceType["Parallel"] = 1] = "Parallel";
    SequenceType[SequenceType["StopOnFailure"] = 2] = "StopOnFailure";
})(SequenceType = exports.SequenceType || (exports.SequenceType = {}));
function sendTransactionsWithManualRetry(connection, wallet, instructions, signers) {
    return __awaiter(this, void 0, void 0, function () {
        var stopPoint, tries, lastInstructionsLength, toRemoveSigners, ids, filteredSigners, id, txs, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stopPoint = 0;
                    tries = 0;
                    lastInstructionsLength = null;
                    toRemoveSigners = {};
                    instructions = instructions.filter(function (instr, i) {
                        if (instr.length > 0) {
                            return true;
                        }
                        else {
                            toRemoveSigners[i] = true;
                            return false;
                        }
                    });
                    ids = [];
                    filteredSigners = signers.filter(function (_, i) { return !toRemoveSigners[i]; });
                    _a.label = 1;
                case 1:
                    if (!(stopPoint < instructions.length && tries < 3)) return [3 /*break*/, 9];
                    instructions = instructions.slice(stopPoint, instructions.length);
                    filteredSigners = filteredSigners.slice(stopPoint, filteredSigners.length);
                    if (instructions.length === lastInstructionsLength)
                        tries = tries + 1;
                    else
                        tries = 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    if (!(instructions.length === 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, exports.sendTransactionWithRetry)(connection, wallet, instructions[0], filteredSigners[0], 'single')];
                case 3:
                    id = _a.sent();
                    ids.push(id.txid);
                    stopPoint = 1;
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (0, exports.sendTransactions)(connection, wallet, instructions, filteredSigners, SequenceType.StopOnFailure, 'single')];
                case 5:
                    txs = (_a.sent()).txs;
                    ids = ids.concat(txs.map(function (t) { return t.txid; }));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 8];
                case 8:
                    console.log('Died on ', stopPoint, 'retrying from instruction', instructions[stopPoint], 'instructions length is', instructions.length);
                    lastInstructionsLength = instructions.length;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/, ids];
            }
        });
    });
}
exports.sendTransactionsWithManualRetry = sendTransactionsWithManualRetry;
var sendTransactions = function (connection, wallet, instructionSet, signersSet, sequenceType, commitment, successCallback, failCallback, block) {
    if (sequenceType === void 0) { sequenceType = SequenceType.Parallel; }
    if (commitment === void 0) { commitment = 'singleGossip'; }
    if (successCallback === void 0) { successCallback = function (txid, ind) { }; }
    if (failCallback === void 0) { failCallback = function (txid, ind) { return false; }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var unsignedTxns, _loop_1, i, signedTxns, pendingTxns, breakEarlyObject, _loop_2, i, state_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!wallet.publicKey)
                        throw new wallet_adapter_base_1.WalletNotConnectedError();
                    console.log('send transaction');
                    unsignedTxns = [];
                    if (!!block) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection.getRecentBlockhash(commitment)];
                case 1:
                    block = _b.sent();
                    _b.label = 2;
                case 2:
                    _loop_1 = function (i) {
                        var instructions = instructionSet[i];
                        var signers = signersSet[i];
                        if (instructions.length === 0) {
                            return "continue";
                        }
                        var transaction = new web3_js_1.Transaction();
                        instructions.forEach(function (instruction) { return transaction.add(instruction); });
                        transaction.recentBlockhash = block.blockhash;
                        transaction.setSigners.apply(transaction, __spreadArray([
                            // fee payed by the wallet owner
                            wallet.publicKey], signers.map(function (s) { return s.publicKey; }), false));
                        if (signers.length > 0) {
                            transaction.partialSign.apply(transaction, signers);
                        }
                        unsignedTxns.push(transaction);
                    };
                    for (i = 0; i < instructionSet.length; i++) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, wallet.signAllTransactions(unsignedTxns)];
                case 3:
                    signedTxns = _b.sent();
                    pendingTxns = [];
                    breakEarlyObject = { breakEarly: false, i: 0 };
                    console.log('Signed txns length', signedTxns.length, 'vs handed in length', instructionSet.length);
                    _loop_2 = function (i) {
                        var signedTxnPromise, e_2, _c;
                        var _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    signedTxnPromise = sendSignedTransaction({
                                        connection: connection,
                                        signedTransaction: signedTxns[i],
                                    });
                                    signedTxnPromise
                                        .then(function (_a) {
                                        var txid = _a.txid, slot = _a.slot;
                                        successCallback(txid, i);
                                    })
                                        .catch(function (reason) {
                                        // @ts-ignore
                                        failCallback(signedTxns[i], i);
                                        if (sequenceType === SequenceType.StopOnFailure) {
                                            breakEarlyObject.breakEarly = true;
                                            breakEarlyObject.i = i;
                                        }
                                    });
                                    if (!(sequenceType !== SequenceType.Parallel)) return [3 /*break*/, 7];
                                    _e.label = 1;
                                case 1:
                                    _e.trys.push([1, 3, , 6]);
                                    return [4 /*yield*/, signedTxnPromise];
                                case 2:
                                    _e.sent();
                                    return [3 /*break*/, 6];
                                case 3:
                                    e_2 = _e.sent();
                                    console.log('Caught failure', e_2);
                                    if (!breakEarlyObject.breakEarly) return [3 /*break*/, 5];
                                    console.log('Died on ', breakEarlyObject.i);
                                    _c = {};
                                    _d = {
                                        success: false,
                                        number: breakEarlyObject.i
                                    };
                                    return [4 /*yield*/, Promise.all(pendingTxns)];
                                case 4: return [2 /*return*/, (_c.value = (_d.txs = _e.sent(),
                                        _d), _c)];
                                case 5: return [3 /*break*/, 6];
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    pendingTxns.push(signedTxnPromise);
                                    _e.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _b.label = 4;
                case 4:
                    if (!(i < signedTxns.length)) return [3 /*break*/, 7];
                    return [5 /*yield**/, _loop_2(i)];
                case 5:
                    state_1 = _b.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _b.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    if (!(sequenceType !== SequenceType.Parallel)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Promise.all(pendingTxns)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    _a = { success: true, number: signedTxns.length };
                    return [4 /*yield*/, Promise.all(pendingTxns)];
                case 10: return [2 /*return*/, (_a.txs = _b.sent(), _a)];
            }
        });
    });
};
exports.sendTransactions = sendTransactions;
var sendTransaction = function (connection, wallet, instructions, signers, awaitConfirmation, commitment, includesFeePayer, block) {
    if (awaitConfirmation === void 0) { awaitConfirmation = true; }
    if (commitment === void 0) { commitment = 'singleGossip'; }
    if (includesFeePayer === void 0) { includesFeePayer = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var transaction, _a, _b, rawTransaction, options, txid, slot, confirmation, errors;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!wallet.publicKey)
                        throw new wallet_adapter_base_1.WalletNotConnectedError();
                    transaction = new web3_js_1.Transaction();
                    instructions.forEach(function (instruction) { return transaction.add(instruction); });
                    _a = transaction;
                    _b = block;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection.getRecentBlockhash(commitment)];
                case 1:
                    _b = (_c.sent());
                    _c.label = 2;
                case 2:
                    _a.recentBlockhash = (_b).blockhash;
                    if (includesFeePayer) {
                        transaction.setSigners.apply(transaction, signers.map(function (s) { return s.publicKey; }));
                    }
                    else {
                        transaction.setSigners.apply(transaction, __spreadArray([
                            // fee payed by the wallet owner
                            wallet.publicKey], signers.map(function (s) { return s.publicKey; }), false));
                    }
                    if (signers.length > 0) {
                        transaction.partialSign.apply(transaction, signers);
                    }
                    if (!!includesFeePayer) return [3 /*break*/, 4];
                    return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 3:
                    transaction = _c.sent();
                    _c.label = 4;
                case 4:
                    rawTransaction = transaction.serialize();
                    options = {
                        skipPreflight: true,
                        commitment: commitment,
                    };
                    return [4 /*yield*/, connection.sendRawTransaction(rawTransaction, options)];
                case 5:
                    txid = _c.sent();
                    slot = 0;
                    if (!awaitConfirmation) return [3 /*break*/, 8];
                    return [4 /*yield*/, awaitTransactionSignatureConfirmation(txid, DEFAULT_TIMEOUT, connection, commitment)];
                case 6:
                    confirmation = _c.sent();
                    if (!confirmation)
                        throw new Error('Timed out awaiting confirmation on transaction');
                    slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
                    if (!(confirmation === null || confirmation === void 0 ? void 0 : confirmation.err)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, exports.getErrorForTransaction)(connection, txid)];
                case 7:
                    errors = _c.sent();
                    console.log(errors);
                    throw new Error("Raw transaction ".concat(txid, " failed"));
                case 8: return [2 /*return*/, { txid: txid, slot: slot }];
            }
        });
    });
};
exports.sendTransaction = sendTransaction;
var sendTransactionWithRetry = function (connection, wallet, instructions, signers, commitment, includesFeePayer, block, beforeSend) {
    if (commitment === void 0) { commitment = 'singleGossip'; }
    if (includesFeePayer === void 0) { includesFeePayer = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var transaction, _a, _b, _c, txid, slot;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!wallet.publicKey)
                        throw new wallet_adapter_base_1.WalletNotConnectedError();
                    transaction = new web3_js_1.Transaction();
                    instructions.forEach(function (instruction) { return transaction.add(instruction); });
                    _a = transaction;
                    _b = block;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection.getRecentBlockhash(commitment)];
                case 1:
                    _b = (_d.sent());
                    _d.label = 2;
                case 2:
                    _a.recentBlockhash = (_b).blockhash;
                    if (includesFeePayer) {
                        transaction.setSigners.apply(transaction, signers.map(function (s) { return s.publicKey; }));
                    }
                    else {
                        transaction.setSigners.apply(transaction, __spreadArray([
                            // fee payed by the wallet owner
                            wallet.publicKey], signers.map(function (s) { return s.publicKey; }), false));
                    }
                    if (signers.length > 0) {
                        transaction.partialSign.apply(transaction, signers);
                    }
                    if (!!includesFeePayer) return [3 /*break*/, 4];
                    return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 3:
                    transaction = _d.sent();
                    _d.label = 4;
                case 4:
                    if (beforeSend) {
                        beforeSend();
                    }
                    return [4 /*yield*/, sendSignedTransaction({
                            connection: connection,
                            signedTransaction: transaction,
                        })];
                case 5:
                    _c = _d.sent(), txid = _c.txid, slot = _c.slot;
                    return [2 /*return*/, { txid: txid, slot: slot }];
            }
        });
    });
};
exports.sendTransactionWithRetry = sendTransactionWithRetry;
var getUnixTs = function () {
    return new Date().getTime() / 1000;
};
exports.getUnixTs = getUnixTs;
var DEFAULT_TIMEOUT = 60000;
function sendSignedTransaction(_a) {
    var signedTransaction = _a.signedTransaction, connection = _a.connection, _b = _a.timeout, timeout = _b === void 0 ? DEFAULT_TIMEOUT : _b;
    return __awaiter(this, void 0, void 0, function () {
        var rawTransaction, startTime, slot, txid, done, confirmation, err_1, simulateResult, e_3, i, line;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rawTransaction = signedTransaction.serialize();
                    startTime = (0, exports.getUnixTs)();
                    slot = 0;
                    return [4 /*yield*/, connection.sendRawTransaction(rawTransaction, {
                            skipPreflight: true,
                        })];
                case 1:
                    txid = _c.sent();
                    console.log('Started awaiting confirmation for', txid);
                    done = false;
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(!done && (0, exports.getUnixTs)() - startTime < timeout)) return [3 /*break*/, 2];
                                    connection.sendRawTransaction(rawTransaction, {
                                        skipPreflight: true,
                                    });
                                    return [4 /*yield*/, sleep(500)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, 9, 10]);
                    return [4 /*yield*/, awaitTransactionSignatureConfirmation(txid, timeout, connection, 'recent', true)];
                case 3:
                    confirmation = _c.sent();
                    if (!confirmation)
                        throw new Error('Timed out awaiting confirmation on transaction');
                    if (confirmation.err) {
                        console.error(confirmation.err);
                        throw new Error('Transaction failed: Custom instruction error');
                    }
                    slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
                    return [3 /*break*/, 10];
                case 4:
                    err_1 = _c.sent();
                    console.error('Timeout Error caught', err_1);
                    if (err_1.timeout) {
                        throw new Error('Timed out awaiting confirmation on transaction');
                    }
                    simulateResult = null;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, simulateTransaction(connection, signedTransaction, 'single')];
                case 6:
                    simulateResult = (_c.sent()).value;
                    return [3 /*break*/, 8];
                case 7:
                    e_3 = _c.sent();
                    return [3 /*break*/, 8];
                case 8:
                    if (simulateResult && simulateResult.err) {
                        if (simulateResult.logs) {
                            for (i = simulateResult.logs.length - 1; i >= 0; --i) {
                                line = simulateResult.logs[i];
                                if (line.startsWith('Program log: ')) {
                                    throw new Error('Transaction failed: ' + line.slice('Program log: '.length));
                                }
                            }
                        }
                        throw new Error(JSON.stringify(simulateResult.err));
                    }
                    return [3 /*break*/, 10];
                case 9:
                    done = true;
                    return [7 /*endfinally*/];
                case 10:
                    console.log('Latency', txid, (0, exports.getUnixTs)() - startTime);
                    return [2 /*return*/, { txid: txid, slot: slot }];
            }
        });
    });
}
exports.sendSignedTransaction = sendSignedTransaction;
function simulateTransaction(connection, transaction, commitment) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, signData, wireTransaction, encodedTransaction, config, args, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // @ts-ignore
                    _a = transaction;
                    return [4 /*yield*/, connection._recentBlockhash(
                        // @ts-ignore
                        connection._disableBlockhashCaching)];
                case 1:
                    // @ts-ignore
                    _a.recentBlockhash = _b.sent();
                    signData = transaction.serializeMessage();
                    wireTransaction = transaction._serialize(signData);
                    encodedTransaction = wireTransaction.toString('base64');
                    config = { encoding: 'base64', commitment: commitment };
                    args = [encodedTransaction, config];
                    return [4 /*yield*/, connection._rpcRequest('simulateTransaction', args)];
                case 2:
                    res = _b.sent();
                    if (res.error) {
                        throw new Error('failed to simulate transaction: ' + res.error.message);
                    }
                    return [2 /*return*/, res.result];
            }
        });
    });
}
function awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment, queryStatus) {
    if (commitment === void 0) { commitment = 'recent'; }
    if (queryStatus === void 0) { queryStatus = false; }
    return __awaiter(this, void 0, void 0, function () {
        var done, status, subId;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    done = false;
                    status = {
                        slot: 0,
                        confirmations: 0,
                        err: null,
                    };
                    subId = 0;
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        setTimeout(function () {
                                            if (done) {
                                                return;
                                            }
                                            done = true;
                                            console.log('Rejecting for timeout...');
                                            reject({ timeout: true });
                                        }, timeout);
                                        try {
                                            subId = connection.onSignature(txid, function (result, context) {
                                                done = true;
                                                status = {
                                                    err: result.err,
                                                    slot: context.slot,
                                                    confirmations: 0,
                                                };
                                                if (result.err) {
                                                    console.log('Rejected via websocket', result.err);
                                                    reject(status);
                                                }
                                                else {
                                                    console.log('Resolved via websocket', result);
                                                    resolve(status);
                                                }
                                            }, commitment);
                                        }
                                        catch (e) {
                                            done = true;
                                            console.error('WS error in setup', txid, e);
                                        }
                                        _a.label = 1;
                                    case 1:
                                        if (!(!done && queryStatus)) return [3 /*break*/, 3];
                                        // eslint-disable-next-line no-loop-func
                                        (function () { return __awaiter(_this, void 0, void 0, function () {
                                            var signatureStatuses, e_4;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4 /*yield*/, connection.getSignatureStatuses([
                                                                txid,
                                                            ])];
                                                    case 1:
                                                        signatureStatuses = _a.sent();
                                                        status = signatureStatuses && signatureStatuses.value[0];
                                                        if (!done) {
                                                            if (!status) {
                                                                console.log('REST null result for', txid, status);
                                                            }
                                                            else if (status.err) {
                                                                console.log('REST error for', txid, status);
                                                                done = true;
                                                                reject(status.err);
                                                            }
                                                            else if (!status.confirmations) {
                                                                console.log('REST no confirmations for', txid, status);
                                                            }
                                                            else {
                                                                console.log('REST confirmation for', txid, status);
                                                                done = true;
                                                                resolve(status);
                                                            }
                                                        }
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        e_4 = _a.sent();
                                                        if (!done) {
                                                            console.log('REST connection error: txid', txid, e_4);
                                                        }
                                                        return [3 /*break*/, 3];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })();
                                        return [4 /*yield*/, sleep(2000)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 1];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    status = _a.sent();
                    //@ts-ignore
                    if (connection._signatureSubscriptions[subId])
                        connection.removeSignatureListener(subId);
                    done = true;
                    console.log('Returning status', status);
                    return [2 /*return*/, status];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function makeTransaction(connection, instructions, signers, feePayer, commitment, includesFeePayer, block) {
    if (commitment === void 0) { commitment = 'singleGossip'; }
    if (includesFeePayer === void 0) { includesFeePayer = false; }
    return __awaiter(this, void 0, void 0, function () {
        var transaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transaction = new web3_js_1.Transaction();
                    instructions.forEach(function (instruction) { return transaction.add(instruction); });
                    if (!!block) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection.getRecentBlockhash(commitment)];
                case 1:
                    block = _a.sent();
                    _a.label = 2;
                case 2:
                    transaction.feePayer = feePayer;
                    transaction.setSigners.apply(transaction, __spreadArray([feePayer], signers.map(function (s) { return s.publicKey; }), false));
                    transaction.recentBlockhash = block.blockhash;
                    if (signers.length > 0) {
                        transaction.partialSign.apply(transaction, signers);
                    }
                    return [2 /*return*/, transaction];
            }
        });
    });
}
exports.makeTransaction = makeTransaction;
function signAndSendTransaction(connection, wallet, transaction, commitment) {
    if (commitment === void 0) { commitment = 'singleGossip'; }
    return __awaiter(this, void 0, void 0, function () {
        var signedTx, options, txid, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 1:
                    signedTx = _a.sent();
                    options = {
                        skipPreflight: true,
                        commitment: commitment,
                    };
                    console.log('signedTx', signedTx.serialize());
                    return [4 /*yield*/, connection.sendRawTransaction(signedTx.serialize(), options)];
                case 2:
                    txid = _a.sent();
                    console.log('txid', txid);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('error', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
exports.signAndSendTransaction = signAndSendTransaction;
var makeATokenAccountTransaction = function (connection, wallet, owner, mint) { return __awaiter(void 0, void 0, void 0, function () {
    var instructions, signers, aTokenAccounts, rent, tokenTo, aTokenAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                instructions = [], signers = [];
                return [4 /*yield*/, connection.getParsedTokenAccountsByOwner(owner, { mint: mint })];
            case 1:
                aTokenAccounts = _a.sent();
                return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(spl_token_1.AccountLayout.span)];
            case 2:
                rent = _a.sent();
                if (aTokenAccounts.value.length === 0) {
                    aTokenAccount = new web3_js_1.Keypair();
                    instructions.push(web3_js_1.SystemProgram.createAccount({
                        fromPubkey: wallet,
                        newAccountPubkey: aTokenAccount.publicKey,
                        lamports: rent,
                        space: spl_token_1.AccountLayout.span,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    }));
                    instructions.push(spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint, aTokenAccount.publicKey, owner));
                    signers.push(aTokenAccount);
                    tokenTo = aTokenAccount.publicKey;
                }
                else {
                    tokenTo = aTokenAccounts.value[0].pubkey;
                }
                return [2 /*return*/, { instructions: instructions, signers: signers, tokenTo: tokenTo }];
        }
    });
}); };
exports.makeATokenAccountTransaction = makeATokenAccountTransaction;

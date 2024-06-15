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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataReader = void 0;
const fs_1 = require("fs");
const readline_1 = require("readline");
class DataReader {
    static readShapesFromFile(filePath) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const lines = [];
            const fileStream = (0, fs_1.createReadStream)(filePath);
            const rl = (0, readline_1.createInterface)({
                input: fileStream,
                crlfDelay: Infinity
            });
            try {
                for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a;) {
                    _c = rl_1_1.value;
                    _d = false;
                    try {
                        const line = _c;
                        lines.push(line);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return lines;
        });
    }
}
exports.DataReader = DataReader;

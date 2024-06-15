"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = require("fs");
class Logger {
    static logInfo(message) {
        console.log(`INFO: ${message}`);
        this.logStream.write(`INFO: ${message}\n`);
    }
    static logError(message) {
        console.error(`ERROR: ${message}`);
        this.logStream.write(`ERROR: ${message}\n`);
    }
}
exports.Logger = Logger;
Logger.logStream = (0, fs_1.createWriteStream)('log.txt', { flags: 'a' });

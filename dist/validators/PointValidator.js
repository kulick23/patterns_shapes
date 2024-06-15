"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointValidator = void 0;
class PointValidator {
    static validate(point) {
        return !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z);
    }
}
exports.PointValidator = PointValidator;

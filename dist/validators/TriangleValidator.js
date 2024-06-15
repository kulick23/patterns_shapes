"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriangleValidator = void 0;
const PointValidator_1 = require("./PointValidator");
class TriangleValidator {
    static validate(triangle) {
        const { p1, p2, p3 } = triangle;
        return (PointValidator_1.PointValidator.validate(p1) &&
            PointValidator_1.PointValidator.validate(p2) &&
            PointValidator_1.PointValidator.validate(p3) &&
            triangle.isValid());
    }
}
exports.TriangleValidator = TriangleValidator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyramidValidator = void 0;
const Triangle_1 = require("../entities/Triangle");
const PointValidator_1 = require("./PointValidator");
class PyramidValidator {
    static validate(pyramid) {
        if (pyramid.basePoints.length !== 4)
            return false;
        const basePointsValid = pyramid.basePoints.every(PointValidator_1.PointValidator.validate);
        const apexValid = PointValidator_1.PointValidator.validate(pyramid.apex);
        const baseValid = this.validateBase(pyramid.basePoints);
        return basePointsValid && apexValid && baseValid;
    }
    static validateBase(points) {
        const [p1, p2, p3, p4] = points;
        const tri1 = new Triangle_1.Triangle(p1, p2, p3);
        const tri2 = new Triangle_1.Triangle(p1, p3, p4);
        return tri1.isValid() && tri2.isValid();
    }
}
exports.PyramidValidator = PyramidValidator;

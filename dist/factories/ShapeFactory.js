"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeFactory = void 0;
const Point_1 = require("../entities/Point");
const Triangle_1 = require("../entities/Triangle");
const Pyramid_1 = require("../entities/Pyramid");
class ShapeFactory {
    static createShape(data) {
        const parts = data.trim().split(/\s+/).map(Number);
        if (parts.some(isNaN)) {
            return null;
        }
        if (parts.length === 6) {
            const [x1, y1, x2, y2, x3, y3] = parts;
            const points = [new Point_1.Point(x1, y1), new Point_1.Point(x2, y2), new Point_1.Point(x3, y3)];
            return new Triangle_1.Triangle(points[0], points[1], points[2]);
        }
        if (parts.length === 15) {
            const [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, xa, ya, za] = parts;
            const points = [new Point_1.Point(x1, y1, z1), new Point_1.Point(x2, y2, z2), new Point_1.Point(x3, y3, z3), new Point_1.Point(x4, y4, z4)];
            const apex = new Point_1.Point(xa, ya, za);
            return new Pyramid_1.Pyramid(points, apex);
        }
        return null;
    }
}
exports.ShapeFactory = ShapeFactory;

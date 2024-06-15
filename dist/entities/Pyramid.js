"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pyramid = void 0;
const Triangle_1 = require("./Triangle");
class Pyramid {
    constructor(basePoints, apex) {
        this.basePoints = basePoints;
        this.apex = apex;
        if (basePoints.length !== 4) {
            throw new Error('A pyramid base must have exactly 4 points.');
        }
    }
    getBaseArea() {
        const [p1, p2, p3, p4] = this.basePoints;
        const tri1 = new Triangle_1.Triangle(p1, p2, p3);
        const tri2 = new Triangle_1.Triangle(p1, p3, p4);
        return tri1.getArea() + tri2.getArea();
    }
    getVolume() {
        return (this.getBaseArea() * Math.abs(this.apex.z - this.basePoints[0].z)) / 3;
    }
    getArea() {
        const baseArea = this.getBaseArea();
        const lateralArea = this.getLateralArea();
        return baseArea + lateralArea;
    }
    getLateralArea() {
        const [p1, p2, p3, p4] = this.basePoints;
        const lateral1 = new Triangle_1.Triangle(p1, p2, this.apex);
        const lateral2 = new Triangle_1.Triangle(p2, p3, this.apex);
        const lateral3 = new Triangle_1.Triangle(p3, p4, this.apex);
        const lateral4 = new Triangle_1.Triangle(p4, p1, this.apex);
        return lateral1.getArea() + lateral2.getArea() + lateral3.getArea() + lateral4.getArea();
    }
    getPerimeter() {
        const [p1, p2, p3, p4] = this.basePoints;
        const basePerimeter = Math.hypot(p2.x - p1.x, p2.y - p1.y) +
            Math.hypot(p3.x - p2.x, p3.y - p2.y) +
            Math.hypot(p4.x - p3.x, p4.y - p3.y) +
            Math.hypot(p1.x - p4.x, p1.y - p4.y);
        return basePerimeter + 4 * Math.hypot(this.apex.x - p1.x, this.apex.y - p1.y, this.apex.z - p1.z);
    }
    isValid() {
        return this.basePoints.length === 4;
    }
    isOnCoordinatePlane() {
        const [p1, p2, p3, p4] = this.basePoints;
        return p1.z === 0 && p2.z === 0 && p3.z === 0 && p4.z === 0;
    }
    getVolumeRatioWhenSliced() {
        const [p1, p2, p3, p4] = this.basePoints;
        if (this.isOnCoordinatePlane()) {
            const baseHeight = Math.abs(this.apex.z);
            const slicedHeight = baseHeight / 2;
            const volumeOriginal = this.getVolume();
            const volumeTop = volumeOriginal / 8;
            const volumeBottom = volumeOriginal - volumeTop;
            return volumeTop / volumeBottom;
        }
        return null;
    }
}
exports.Pyramid = Pyramid;

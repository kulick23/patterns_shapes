"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    getArea() {
        const { p1, p2, p3 } = this;
        return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
    }
    getPerimeter() {
        const { p1, p2, p3 } = this;
        const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
        const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
        return a + b + c;
    }
    isValid() {
        return this.getArea() > 0;
    }
    isRight() {
        const { p1, p2, p3 } = this;
        const a2 = Math.pow(Math.hypot(p2.x - p1.x, p2.y - p1.y), 2);
        const b2 = Math.pow(Math.hypot(p3.x - p2.x, p3.y - p2.y), 2);
        const c2 = Math.pow(Math.hypot(p1.x - p3.x, p1.y - p3.y), 2);
        return (Math.abs(a2 + b2 - c2) < 1e-10 ||
            Math.abs(b2 + c2 - a2) < 1e-10 ||
            Math.abs(c2 + a2 - b2) < 1e-10);
    }
    isIsosceles() {
        const { p1, p2, p3 } = this;
        const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
        const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
        return a === b || b === c || a === c;
    }
    isEquilateral() {
        const { p1, p2, p3 } = this;
        const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
        const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
        const epsilon = 1e-10;
        return Math.abs(a - b) < epsilon && Math.abs(b - c) < epsilon && Math.abs(a - c) < epsilon;
    }
    isAcute() {
        const { p1, p2, p3 } = this;
        const a2 = Math.pow(Math.hypot(p2.x - p1.x, p2.y - p1.y), 2);
        const b2 = Math.pow(Math.hypot(p3.x - p2.x, p3.y - p2.y), 2);
        const c2 = Math.pow(Math.hypot(p1.x - p3.x, p1.y - p3.y), 2);
        return a2 + b2 > c2 && b2 + c2 > a2 && c2 + a2 > b2;
    }
    isObtuse() {
        const { p1, p2, p3 } = this;
        const a2 = Math.pow(Math.hypot(p2.x - p1.x, p2.y - p1.y), 2);
        const b2 = Math.pow(Math.hypot(p3.x - p2.x, p3.y - p2.y), 2);
        const c2 = Math.pow(Math.hypot(p1.x - p3.x, p1.y - p3.y), 2);
        return a2 + b2 < c2 || b2 + c2 < a2 || c2 + a2 < b2;
    }
    getType() {
        if (this.isEquilateral())
            return 'Equilateral';
        if (this.isIsosceles())
            return 'Isosceles';
        if (this.isRight())
            return 'Right';
        if (this.isAcute())
            return 'Acute';
        if (this.isObtuse())
            return 'Obtuse';
        return 'Scalene';
    }
}
exports.Triangle = Triangle;

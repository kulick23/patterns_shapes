import { Point } from '../entities/Point';
import { Triangle } from '../entities/Triangle';
import { Pyramid } from '../entities/Pyramid';
import { IShape } from '../interfaces/IShape';

export class ShapeFactory {
  static createShape(data: string): IShape | null {
    const parts = data.trim().split(/\s+/).map(Number);

    if (parts.some(isNaN)) {
      return null;
    }

    if (parts.length === 6) {
      const [x1, y1, x2, y2, x3, y3] = parts;
      const points = [new Point(x1, y1), new Point(x2, y2), new Point(x3, y3)];
      return new Triangle(points[0], points[1], points[2]);
    }

    if (parts.length === 15) {
      const [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, xa, ya, za] = parts;
      const points = [new Point(x1, y1, z1), new Point(x2, y2, z2), new Point(x3, y3, z3), new Point(x4, y4, z4)];
      const apex = new Point(xa, ya, za);
      return new Pyramid(points, apex);
    }

    return null;
  }
}

import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';
import { Triangle } from '../entities/Triangle';
import { PointValidator } from './PointValidator';

export class PyramidValidator {
  static validate(pyramid: Pyramid): boolean {
    if (pyramid.basePoints.length !== 4) return false;
    const basePointsValid = pyramid.basePoints.every(PointValidator.validate);
    const apexValid = PointValidator.validate(pyramid.apex);
    const baseValid = this.validateBase(pyramid.basePoints);
    return basePointsValid && apexValid && baseValid;
  }

  private static validateBase(points: Point[]): boolean {
    const [p1, p2, p3, p4] = points;
    const tri1 = new Triangle(p1, p2, p3);
    const tri2 = new Triangle(p1, p3, p4);
    return tri1.isValid() && tri2.isValid();
  }
}

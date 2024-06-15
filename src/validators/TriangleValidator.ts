import { PointValidator } from './PointValidator';
import { Triangle } from '../entities/Triangle';

export class TriangleValidator {
  static validate(triangle: Triangle): boolean {
    const { p1, p2, p3 } = triangle;
    return (
      PointValidator.validate(p1) &&
      PointValidator.validate(p2) &&
      PointValidator.validate(p3) &&
      triangle.isValid()
    );
  }
}

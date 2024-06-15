import { Point } from "../entities/Point";
export class PointValidator {
    static validate(point: Point): boolean {
      return !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z);
    }
  }
  
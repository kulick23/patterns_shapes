import { Point } from '../src/entities/Point';

describe('Point', () => {
  test('should create a point with default z', () => {
    const point = new Point(1, 2);
    expect(point.z).toBe(0);
  });

  test('should create a point with specified z', () => {
    const point = new Point(1, 2, 3);
    expect(point.z).toBe(3);
  });
});

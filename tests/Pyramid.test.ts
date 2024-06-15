import { Point } from '../src/entities/Point';
import { Pyramid } from '../src/entities/Pyramid';

describe('Pyramid', () => {
  const basePoints = [
    new Point(0, 0, 0),
    new Point(4, 0, 0),
    new Point(4, 4, 0),
    new Point(0, 4, 0)
  ];
  const apex = new Point(2, 2, 6);
  const pyramid = new Pyramid(basePoints, apex);

  test('should calculate base area', () => {
    expect(pyramid.getBaseArea()).toBe(16);
  });

  test('should calculate volume', () => {
    expect(pyramid.getVolume()).toBeCloseTo(32, 2);
  });

  test('should calculate surface area', () => {
    const lateralArea = pyramid.getLateralArea();
    const baseArea = pyramid.getBaseArea();
    expect(pyramid.getArea()).toBeCloseTo(baseArea + lateralArea, 2);
  });

  test('should calculate lateral area', () => {
    expect(pyramid.getLateralArea()).toBeGreaterThan(0);
  });

  test('should calculate perimeter', () => {
    expect(pyramid.getPerimeter()).toBeGreaterThan(0);
  });

  test('should be a valid pyramid', () => {
    expect(pyramid.isValid()).toBe(true);
  });

  test('should check if base is on coordinate plane', () => {
    expect(pyramid.isOnCoordinatePlane()).toBe(true);
  });

  test('should calculate volume ratio when sliced', () => {
    const volumeRatio = pyramid.getVolumeRatioWhenSliced();
    expect(volumeRatio).not.toBeNull();
    expect(volumeRatio).toBeCloseTo(1 / 7, 3); 
  });
});

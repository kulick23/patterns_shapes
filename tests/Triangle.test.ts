import { Point } from '../src/entities/Point';
import { Triangle } from '../src/entities/Triangle';

describe('Triangle', () => {
  const p1 = new Point(0, 0);
  const p2 = new Point(3, 0);
  const p3 = new Point(0, 4);
  const triangle = new Triangle(p1, p2, p3);

  test('should calculate area', () => {
    expect(triangle.getArea()).toBe(6);
  });

  test('should calculate perimeter', () => {
    expect(triangle.getPerimeter()).toBeCloseTo(12, 2);
  });

  test('should identify as valid triangle', () => {
    expect(triangle.isValid()).toBe(true);
  });

  test('should identify as right triangle', () => {
    expect(triangle.isRight()).toBe(true);
  });

  test('should identify as isosceles triangle', () => {
    const p4 = new Point(1, 1);
    const p5 = new Point(5, 1);
    const p6 = new Point(3, 3);
    const isoscelesTriangle = new Triangle(p4, p5, p6);
    expect(isoscelesTriangle.isIsosceles()).toBe(true);
  });

  test('should identify as equilateral triangle', () => {
    const p4 = new Point(0, 0);
    const p5 = new Point(1, Math.sqrt(3));
    const p6 = new Point(2, 0);
    const equilateralTriangle = new Triangle(p4, p5, p6);
    expect(equilateralTriangle.isEquilateral()).toBe(true);
  });

  test('should identify as acute triangle', () => {
    const p4 = new Point(0, 0);
    const p5 = new Point(1, 0);
    const p6 = new Point(0.5, 1);
    const acuteTriangle = new Triangle(p4, p5, p6);
    expect(acuteTriangle.isAcute()).toBe(true);
  });

  test('should identify as obtuse triangle', () => {
    const p4 = new Point(0, 0);
    const p5 = new Point(2, 0);
    const p6 = new Point(0.5, 0.5);
    const obtuseTriangle = new Triangle(p4, p5, p6);
    expect(obtuseTriangle.isObtuse()).toBe(true);
  });

  test('should identify triangle type', () => {
    expect(triangle.getType()).toBe('Right');
  });
});

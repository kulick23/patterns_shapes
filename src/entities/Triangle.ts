import { Point } from './Point';
import { IShape } from '../interfaces/IShape';

export class Triangle implements IShape {
  constructor(public p1: Point, public p2: Point, public p3: Point) {}

//Площадь
  getArea(): number {
    const { p1, p2, p3 } = this;
    return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
  }

  //Перимитр 
  getPerimeter(): number {
    const { p1, p2, p3 } = this;
    const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
    const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
    return a + b + c;
  }

  //Сущесвует ли
  isValid(): boolean {
    return this.getArea() > 0;
  }

  //Прямоугольный
  isRight(): boolean {
    const { p1, p2, p3 } = this;
    const a2 = Math.hypot(p2.x - p1.x, p2.y - p1.y) ** 2;
    const b2 = Math.hypot(p3.x - p2.x, p3.y - p2.y) ** 2;
    const c2 = Math.hypot(p1.x - p3.x, p1.y - p3.y) ** 2;
    return (
      Math.abs(a2 + b2 - c2) < 1e-10 ||
      Math.abs(b2 + c2 - a2) < 1e-10 ||
      Math.abs(c2 + a2 - b2) < 1e-10
    );
  }

    //Равнобедренный
  isIsosceles(): boolean {
    const { p1, p2, p3 } = this;
    const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
    const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
    return a === b || b === c || a === c;
  }

    //Равносторонний
  isEquilateral(): boolean {
    const { p1, p2, p3 } = this;
    const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const b = Math.hypot(p3.x - p2.x, p3.y - p2.y);
    const c = Math.hypot(p1.x - p3.x, p1.y - p3.y);
    const epsilon = 1e-10;
    return Math.abs(a - b) < epsilon && Math.abs(b - c) < epsilon && Math.abs(a - c) < epsilon;
  }

    //Остроугольный
  isAcute(): boolean {
    const { p1, p2, p3 } = this;
    const a2 = Math.hypot(p2.x - p1.x, p2.y - p1.y) ** 2;
    const b2 = Math.hypot(p3.x - p2.x, p3.y - p2.y) ** 2;
    const c2 = Math.hypot(p1.x - p3.x, p1.y - p3.y) ** 2;
    return a2 + b2 > c2 && b2 + c2 > a2 && c2 + a2 > b2;
  }

    //Тупоугольный
  isObtuse(): boolean {
    const { p1, p2, p3 } = this;
    const a2 = Math.hypot(p2.x - p1.x, p2.y - p1.y) ** 2;
    const b2 = Math.hypot(p3.x - p2.x, p3.y - p2.y) ** 2;
    const c2 = Math.hypot(p1.x - p3.x, p1.y - p3.y) ** 2;
    return a2 + b2 < c2 || b2 + c2 < a2 || c2 + a2 < b2;
  }

  getType(): string {
    if (this.isEquilateral()) return 'Equilateral';
    if (this.isIsosceles()) return 'Isosceles';
    if (this.isRight()) return 'Right';
    if (this.isAcute()) return 'Acute';
    if (this.isObtuse()) return 'Obtuse';
    return 'Scalene';
  }
}

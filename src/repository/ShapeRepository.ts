import { IShape } from '../interfaces/IShape';
import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';
import { Triangle } from '../entities/Triangle';

export class ShapeRepository {
    private shapes: Map<string, IShape> = new Map();

    addShape(id: string, shape: IShape): void {
        this.shapes.set(id, shape);
    }

    removeShape(id: string): boolean {
        return this.shapes.delete(id);
    }

    getShapeById(id: string): IShape | undefined {
        return this.shapes.get(id);
    }

    getAllShapes(): Map<string, IShape> {
        return this.shapes;
    }

    findShapesByName(name: string): IShape[] {
        return Array.from(this.shapes.values()).filter(shape => shape.constructor.name === name);
    }

    findShapesInFirstQuadrant(): IShape[] {
        return Array.from(this.shapes.values()).filter(shape => {
            if (shape instanceof Point) {
                return shape.x > 0 && shape.y > 0;
            } else if (shape instanceof Triangle) {
                return [shape.p1, shape.p2, shape.p3].every(point => point.x > 0 && point.y > 0);
            } else if (shape instanceof Pyramid) {
                return shape.basePoints.every(point => point.x > 0 && point.y > 0) && shape.apex.x > 0 && shape.apex.y > 0;
            }
            return false;
        });
    }

    findShapesBySurfaceAreaRange(min: number, max: number): IShape[] {
        return Array.from(this.shapes.values()).filter(shape => {
            const area = shape.getArea();
            return area >= min && area <= max;
        });
    }

    findShapesByVolumeRange(min: number, max: number): IShape[] {
        return Array.from(this.shapes.values()).filter(shape => {
            if (shape instanceof Pyramid) {
                const volume = shape.getVolume();
                return volume >= min && volume <= max;
            }
            return false;
        });
    }

    findShapesByDistanceRange(min: number, max: number): IShape[] {
        return Array.from(this.shapes.values()).filter(shape => {
            if (shape instanceof Point) {
                const distance = Math.hypot(shape.x, shape.y, shape.z);
                return distance >= min && distance <= max;
            } else if (shape instanceof Triangle) {
                const points = [shape.p1, shape.p2, shape.p3];
                return points.every(point => {
                    const distance = Math.hypot(point.x, point.y, point.z);
                    return distance >= min && distance <= max;
                });
            } else if (shape instanceof Pyramid) {
                const points = [...shape.basePoints, shape.apex];
                return points.every(point => {
                    const distance = Math.hypot(point.x, point.y, point.z);
                    return distance >= min && distance <= max;
                });
            }
            return false;
        });
    }

    sortShapesById(): IShape[] {
        return Array.from(this.shapes.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(entry => entry[1]);
    }

    sortShapesByName(): IShape[] {
        return Array.from(this.shapes.values())
            .sort((a, b) => a.constructor.name.localeCompare(b.constructor.name));
    }

    sortShapesByFirstPointCoordinateX(): IShape[] {
        return Array.from(this.shapes.values())
            .sort((a, b) => {
                const ax = this.getFirstPoint(a).x;
                const bx = this.getFirstPoint(b).x;
                return ax - bx;
            });
    }

    sortShapesByFirstPointCoordinateY(): IShape[] {
        return Array.from(this.shapes.values())
            .sort((a, b) => {
                const ay = this.getFirstPoint(a).y;
                const by = this.getFirstPoint(b).y;
                return ay - by;
            });
    }

    private getFirstPoint(shape: IShape): Point {
        if (shape instanceof Point) {
            return shape;
        } else if (shape instanceof Triangle) {
            return shape.p1;
        } else if (shape instanceof Pyramid) {
            return shape.basePoints[0];
        }
        throw new Error('Unsupported shape type');
    }
}

import { IShape } from '../interfaces/IShape';
import { Pyramid } from '../entities/Pyramid';

class Warehouse {
    private static instance: Warehouse;
    private shapeData: Map<string, { area: number, perimeter: number, volume?: number }> = new Map();

    private constructor() {}

    static getInstance(): Warehouse {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }

    updateShapeData(id: string, shape: IShape): void {
        const data = {
            area: shape.getArea(),
            perimeter: shape.getPerimeter(),
            volume: shape instanceof Pyramid ? shape.getVolume() : undefined
        };
        this.shapeData.set(id, data);
    }

    getShapeData(id: string) {
        return this.shapeData.get(id);
    }
}

export { Warehouse };

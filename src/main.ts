import { ShapeFactory } from './factories/ShapeFactory';
import { Logger } from './utils/Logger';
import { DataReader } from './utils/DataReader';
import { TriangleValidator } from './validators/TriangleValidator';
import { PyramidValidator } from './validators/PyramidValidator';
import { Triangle } from './entities/Triangle';
import { Pyramid } from './entities/Pyramid';
import { ShapeRepository } from './repository/ShapeRepository';
import { Warehouse } from './utils/Warehouse';
import * as readline from 'readline';

async function main() {
    const shapeRepository = new ShapeRepository();
    const warehouse = Warehouse.getInstance();

    try {
        const inputLines = await DataReader.readShapesFromFile('input.txt');

        inputLines.forEach((data, index) => {
            const shape = ShapeFactory.createShape(data);
            const id = `shape-${index + 1}`;
            if (shape) {
                if (shape instanceof Triangle) {
                    if (TriangleValidator.validate(shape)) {
                        shapeRepository.addShape(id, shape);
                        warehouse.updateShapeData(id, shape);
                        Logger.logInfo(`Valid Triangle created with data: ${data}`);
                    } else {
                        Logger.logError(`Invalid Triangle data: ${data}`);
                    }
                } else if (shape instanceof Pyramid) {
                    if (PyramidValidator.validate(shape)) {
                        shapeRepository.addShape(id, shape);
                        warehouse.updateShapeData(id, shape);
                        Logger.logInfo(`Valid Pyramid created with data: ${data}`);
                    } else {
                        Logger.logError(`Invalid Pyramid data: ${data}`);
                    }
                } else {
                    Logger.logError(`Unknown shape type with data: ${data}`);
                }
            } else {
                Logger.logError(`Invalid shape data: ${data}`);
            }
        });

        // Вывод всех фигур из репозитория
        console.log('All shapes in repository:');
        shapeRepository.getAllShapes().forEach((shape, id) => {
            console.log(`ID: ${id}, Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
            if (shape instanceof Pyramid) {
                console.log(`Volume: ${shape.getVolume()}`);
            }
        });

        // Интерфейс командной строки для управления репозиторием
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        function showMenu() {
            console.log('\nChoose an action:');
            console.log('1. Show all shapes');
            console.log('2. Sort shapes by ID');
            console.log('3. Sort shapes by name');
            console.log('4. Sort shapes by first point X coordinate');
            console.log('5. Sort shapes by first point Y coordinate');
            console.log('6. Add a shape');
            console.log('7. Remove a shape');
            console.log('8. Search shapes');
            console.log('9. Exit');
        }

        function handleUserInput(input: string) {
            switch (input.trim()) {
                case '1':
                    console.log('All shapes in repository:');
                    shapeRepository.getAllShapes().forEach((shape, id) => {
                        console.log(`ID: ${id}, Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                        if (shape instanceof Pyramid) {
                            console.log(`Volume: ${shape.getVolume()}`);
                        }
                    });
                    break;
                case '2':
                    console.log('Shapes sorted by ID:');
                    shapeRepository.sortShapesById().forEach(shape => {
                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                        if (shape instanceof Pyramid) {
                            console.log(`Volume: ${shape.getVolume()}`);
                        }
                    });
                    break;
                case '3':
                    console.log('Shapes sorted by name:');
                    shapeRepository.sortShapesByName().forEach(shape => {
                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                        if (shape instanceof Pyramid) {
                            console.log(`Volume: ${shape.getVolume()}`);
                        }
                    });
                    break;
                case '4':
                    console.log('Shapes sorted by first point X coordinate:');
                    shapeRepository.sortShapesByFirstPointCoordinateX().forEach(shape => {
                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                        if (shape instanceof Pyramid) {
                            console.log(`Volume: ${shape.getVolume()}`);
                        }
                    });
                    break;
                case '5':
                    console.log('Shapes sorted by first point Y coordinate:');
                    shapeRepository.sortShapesByFirstPointCoordinateY().forEach(shape => {
                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                        if (shape instanceof Pyramid) {
                            console.log(`Volume: ${shape.getVolume()}`);
                        }
                    });
                    break;
                case '6':
                    rl.question('Enter shape data (e.g., for Triangle: "0 0 3 0 0 4", for Pyramid: "0 0 0 4 0 0 4 4 0 0 4 0 2 2 6"): ', (data) => {
                        const shape = ShapeFactory.createShape(data);
                        const id = `shape-${Date.now()}`;
                        if (shape) {
                            if (shape instanceof Triangle && TriangleValidator.validate(shape)) {
                                shapeRepository.addShape(id, shape);
                                warehouse.updateShapeData(id, shape);
                                console.log(`Triangle added with ID: ${id}`);
                            } else if (shape instanceof Pyramid && PyramidValidator.validate(shape)) {
                                shapeRepository.addShape(id, shape);
                                warehouse.updateShapeData(id, shape);
                                console.log(`Pyramid added with ID: ${id}`);
                            } else {
                                console.log('Invalid shape data.');
                            }
                        } else {
                            console.log('Invalid shape data.');
                        }
                        showMenu();
                    });
                    break;
                case '7':
                    rl.question('Enter shape ID to remove: ', (id) => {
                        if (shapeRepository.removeShape(id)) {
                            console.log(`Shape with ID: ${id} removed.`);
                        } else {
                            console.log(`Shape with ID: ${id} not found.`);
                        }
                        showMenu();
                    });
                    break;
                case '8':
                    rl.question('Choose search criteria: 1) By ID 2) By Name 3) In First Quadrant 4) By Surface Area Range 5) By Volume Range 6) By Distance Range: ', (criteria) => {
                        switch (criteria.trim()) {
                            case '1':
                                rl.question('Enter shape ID: ', (id) => {
                                    const shape = shapeRepository.getShapeById(id);
                                    if (shape) {
                                        console.log(`ID: ${id}, Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                        if (shape instanceof Pyramid) {
                                            console.log(`Volume: ${shape.getVolume()}`);
                                        }
                                    } else {
                                        console.log(`Shape with ID: ${id} not found.`);
                                    }
                                    showMenu();
                                });
                                break;
                            case '2':
                                rl.question('Enter shape name: ', (name) => {
                                    const shapes = shapeRepository.findShapesByName(name);
                                    shapes.forEach(shape => {
                                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                        if (shape instanceof Pyramid) {
                                            console.log(`Volume: ${shape.getVolume()}`);
                                        }
                                    });
                                    showMenu();
                                });
                                break;
                            case '3':
                                console.log('Shapes in first quadrant:');
                                shapeRepository.findShapesInFirstQuadrant().forEach(shape => {
                                    console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                    if (shape instanceof Pyramid) {
                                        console.log(`Volume: ${shape.getVolume()}`);
                                    }
                                });
                                showMenu();
                                break;
                            case '4':
                                rl.question('Enter surface area range (min max): ', (range) => {
                                    const [min, max] = range.split(' ').map(Number);
                                    const shapes = shapeRepository.findShapesBySurfaceAreaRange(min, max);
                                    shapes.forEach(shape => {
                                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                        if (shape instanceof Pyramid) {
                                            console.log(`Volume: ${shape.getVolume()}`);
                                        }
                                    });
                                    showMenu();
                                });
                                break;
                            case '5':
                                rl.question('Enter volume range (min max): ', (range) => {
                                    const [min, max] = range.split(' ').map(Number);
                                    const shapes = shapeRepository.findShapesByVolumeRange(min, max);
                                    shapes.forEach(shape => {
                                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                        if (shape instanceof Pyramid) {
                                            console.log(`Volume: ${shape.getVolume()}`);
                                        }
                                    });
                                    showMenu();
                                });
                                break;
                            case '6':
                                rl.question('Enter distance range (min max): ', (range) => {
                                    const [min, max] = range.split(' ').map(Number);
                                    const shapes = shapeRepository.findShapesByDistanceRange(min, max);
                                    shapes.forEach(shape => {
                                        console.log(`Type: ${shape.constructor.name}, Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
                                        if (shape instanceof Pyramid) {
                                            console.log(`Volume: ${shape.getVolume()}`);
                                        }
                                    });
                                    showMenu();
                                });
                                break;
                            default:
                                console.log('Invalid search criteria.');
                                showMenu();
                                break;
                        }
                    });
                    break;
                case '9':
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice.');
                    showMenu();
                    break;
            }
        }

        showMenu();
        rl.on('line', handleUserInput);
    } catch (error) {
        if (error instanceof Error) {
            Logger.logError(`Error reading shapes: ${error.message}`);
        } else {
            Logger.logError(`Unknown error reading shapes`);
        }
    }
}

main();

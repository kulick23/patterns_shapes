"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShapeFactory_1 = require("./factories/ShapeFactory");
const Logger_1 = require("./utils/Logger");
const DataReader_1 = require("./utils/DataReader");
const TriangleValidator_1 = require("./validators/TriangleValidator");
const PyramidValidator_1 = require("./validators/PyramidValidator");
const Triangle_1 = require("./entities/Triangle");
const Pyramid_1 = require("./entities/Pyramid");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputLines = yield DataReader_1.DataReader.readShapesFromFile('input.txt');
            inputLines.forEach(data => {
                const shape = ShapeFactory_1.ShapeFactory.createShape(data);
                if (shape) {
                    if (shape instanceof Triangle_1.Triangle) {
                        if (TriangleValidator_1.TriangleValidator.validate(shape)) {
                            Logger_1.Logger.logInfo(`Valid Triangle created with data: ${data}`);
                            Logger_1.Logger.logInfo(`Area: ${shape.getArea()}`);
                            Logger_1.Logger.logInfo(`Perimeter: ${shape.getPerimeter()}`);
                            Logger_1.Logger.logInfo(`Type: ${shape.getType()}`);
                        }
                        else {
                            Logger_1.Logger.logError(`Invalid Triangle data: ${data}`);
                        }
                    }
                    else if (shape instanceof Pyramid_1.Pyramid) {
                        if (PyramidValidator_1.PyramidValidator.validate(shape)) {
                            Logger_1.Logger.logInfo(`Valid Pyramid created with data: ${data}`);
                            Logger_1.Logger.logInfo(`Base Area: ${shape.getBaseArea()}`);
                            Logger_1.Logger.logInfo(`Volume: ${shape.getVolume()}`);
                            Logger_1.Logger.logInfo(`Surface Area: ${shape.getArea()}`);
                            const volumeRatio = shape.getVolumeRatioWhenSliced();
                            if (volumeRatio !== null) {
                                Logger_1.Logger.logInfo(`Volume Ratio when sliced: ${volumeRatio}`);
                            }
                            Logger_1.Logger.logInfo(`Is Base on Coordinate Plane: ${shape.isOnCoordinatePlane()}`);
                        }
                        else {
                            Logger_1.Logger.logError(`Invalid Pyramid data: ${data}`);
                        }
                    }
                    else {
                        Logger_1.Logger.logError(`Unknown shape type with data: ${data}`);
                    }
                }
                else {
                    Logger_1.Logger.logError(`Invalid shape data: ${data}`);
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                Logger_1.Logger.logError(`Error reading shapes: ${error.message}`);
            }
            else {
                Logger_1.Logger.logError(`Unknown error reading shapes`);
            }
        }
    });
}
main();

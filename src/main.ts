import { ShapeFactory } from './factories/ShapeFactory';
import { Logger } from './utils/Logger';
import { DataReader } from './utils/DataReader';
import { TriangleValidator } from './validators/TriangleValidator';
import { PyramidValidator } from './validators/PyramidValidator';
import { Triangle } from './entities/Triangle';
import { Pyramid } from './entities/Pyramid';

async function main() {
  try {
    const inputLines = await DataReader.readShapesFromFile('input.txt');
    
    inputLines.forEach(data => {
      const shape = ShapeFactory.createShape(data);
      if (shape) {
        if (shape instanceof Triangle) {
          if (TriangleValidator.validate(shape)) {
            Logger.logInfo(`Valid Triangle created with data: ${data}`);
            Logger.logInfo(`Area: ${shape.getArea()}`);
            Logger.logInfo(`Perimeter: ${shape.getPerimeter()}`);
            Logger.logInfo(`Type: ${shape.getType()}`);
          } else {
            Logger.logError(`Invalid Triangle data: ${data}`);
          }
        } else if (shape instanceof Pyramid) {
          if (PyramidValidator.validate(shape)) {
            Logger.logInfo(`Valid Pyramid created with data: ${data}`);
            Logger.logInfo(`Base Area: ${shape.getBaseArea()}`);
            Logger.logInfo(`Volume: ${shape.getVolume()}`);
            Logger.logInfo(`Surface Area: ${shape.getArea()}`);
            const volumeRatio = shape.getVolumeRatioWhenSliced();
            if (volumeRatio !== null) {
              Logger.logInfo(`Volume Ratio when sliced: ${volumeRatio}`);
            }
            Logger.logInfo(`Is Base on Coordinate Plane: ${shape.isOnCoordinatePlane()}`);
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
  } catch (error) {
    if (error instanceof Error) {
      Logger.logError(`Error reading shapes: ${error.message}`);
    } else {
      Logger.logError(`Unknown error reading shapes`);
    }
  }
}

main();

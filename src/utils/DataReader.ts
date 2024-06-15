import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export class DataReader {
  static async readShapesFromFile(filePath: string): Promise<string[]> {
    const lines: string[] = [];
    const fileStream = createReadStream(filePath);
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      lines.push(line);
    }

    return lines;
  }
}

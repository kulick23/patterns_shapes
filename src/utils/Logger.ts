import { createWriteStream } from 'fs';

export class Logger {
  private static logStream = createWriteStream('log.txt', { flags: 'a' });

  static logInfo(message: string): void {
    console.log(`INFO: ${message}`);
    this.logStream.write(`INFO: ${message}\n`);
  }

  static logError(message: string): void {
    console.error(`ERROR: ${message}`);
    this.logStream.write(`ERROR: ${message}\n`);
  }
}

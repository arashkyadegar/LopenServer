import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";

export class EmailLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor() {
    this.logger = new WinstonLogger("EmailLogger");
  }
  logError(err: string, method: string): void {
    const instance = this.logger.getLogger(method);
    instance.error(err);
  }
  logInfo(err: string, method: string): void {
    const instance = this.logger.getLogger(method);
    instance.info(err);
  }
}

module.exports = {
  EmailLogger,
};

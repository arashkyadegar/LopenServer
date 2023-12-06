import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class ScoreWbDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("ScoreWbDal");
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


export class ScoreWbRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("ScoreWbRouter");
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


export class ScoreWbRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("ScoreWbRouterClass");
  }

  logError(err: string,method: string): void {
    const instance = this.logger.getLogger(method);
    instance.error(err);
  }

  logInfo(err: string,method: string): void {
    const instance = this.logger.getLogger(method);
    instance.info(err);
  }
}

module.exports = {
  ScoreWbRouterClassLogger,
  ScoreWbRouterLogger,
  ScoreWbDalLogger
}

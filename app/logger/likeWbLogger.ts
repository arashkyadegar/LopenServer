import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class LikeWbDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("LikeWbDal");
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


export class LikeWbRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("LikeWbRouter");
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


export class LikeWbRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("LikeWbRouterClass");
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
  LikeWbRouterClassLogger,
  LikeWbRouterLogger,
  LikeWbDalLogger
}

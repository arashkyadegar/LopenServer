import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class SiteInfoWbDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("SiteInfoWbDal");
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


export class SiteInfoWbRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("SiteInfoWbRouter");
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


export class SiteInfoWbRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("SiteInfoWbRouterClass");
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
  SiteInfoWbRouterClassLogger,
  SiteInfoWbRouterLogger,
  SiteInfoWbDalLogger
}

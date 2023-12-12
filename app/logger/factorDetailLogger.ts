import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class FactorDetailDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailDal");
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


export class FactorDetailRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailRouter");
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


export class FactorDetailRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailRouterClass");
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



export class FactorDetailWbDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailWbDal");
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


export class FactorDetailWbRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailWbRouter");
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


export class FactorDetailWbRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("FactorDetailWbRouterClass");
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
  FactorDetailRouterClassLogger,
  FactorDetailRouterLogger,
  FactorDetailDalLogger,
  FactorDetailWbDalLogger,
  FactorDetailWbRouterLogger,
  FactorDetailWbRouterClassLogger
}

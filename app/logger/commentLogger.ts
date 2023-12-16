import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class CommentDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentDal");
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


export class CommentRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentRouter");
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


export class CommentRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentRouterClass");
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



export class CommentWbDalLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentWbDal");
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


export class CommentWbRouterLogger implements IBaseLogger {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentWbRouter");
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


export class CommentWbRouterClassLogger implements IBaseLogger  {
  logger: WinstonLogger;
  constructor(){
    this.logger= new WinstonLogger("CommentWbRouterClass");
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
  CommentRouterClassLogger,
  CommentRouterLogger,
  CommentDalLogger,
  CommentWbDalLogger,
  CommentWbRouterLogger,
  CommentWbRouterClassLogger
}

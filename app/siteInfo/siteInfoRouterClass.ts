import { ResponseStatus } from "../utility/errorStatus";
import { SiteInfoBus } from "./siteInfoBus";
import { SiteInfoRouterClassLogger } from "../logger/siteInfoLogger";
import { SiteInfoEntity, SiteInfoSchema } from "./siteInfoEntity";

export class SiteInfoRouterClass {
  bus: SiteInfoBus;
  logger: any;
  constructor(b: SiteInfoBus) {
    this.bus = b;
    this.logger = new SiteInfoRouterClassLogger();
  }

  async updateOne(req, res, next) {
    let result;
    const siteInfoEntity = req.body as SiteInfoEntity;
    console.log(siteInfoEntity);
    const { error } = SiteInfoSchema.validate(siteInfoEntity);
    if (error) {
      this.logger.logError(error, "updateOneSiteInfo");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: error,
      };
    } else {
      result = await this.bus.updateOne("1", siteInfoEntity);
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }
  }

  async findOne(req, res, next): Promise<any> {
    let result;
      result = await this.bus.findOne("1");
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    
  }
}

import { ResponseStatus } from "../utility/errorStatus";
import { SiteInfoBus } from "./siteInfoWbBus";
import { SiteInfoWbRouterClassLogger } from "../logger/siteInfoWbLogger";

export class SiteInfoRouterClass {
  bus: SiteInfoBus;
  logger: any;
  constructor(b: SiteInfoBus) {
    this.bus = b;
    this.logger = new SiteInfoWbRouterClassLogger();
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

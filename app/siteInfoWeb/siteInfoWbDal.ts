import { SiteInfoEntity } from "../siteInfo/siteInfoEntity";
import { SiteInfoWbDalLogger } from "../logger/siteInfoWbLogger";
import { MongoDb } from "../config/mongodb";

export interface SiteInfoDal {

  findOne(id: string): Promise<SiteInfoEntity>;
}

export class SiteInfoDalConc implements SiteInfoDal {
  logger: any;

  constructor() {
    this.logger = new SiteInfoWbDalLogger();
  }

  async findOne(id: string): Promise<SiteInfoEntity> {
    let result;
    try {
      const collection = MongoDb.dbconnect("siteInfos");
      await collection.then((posts) => {
        result = posts.find().toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }


}

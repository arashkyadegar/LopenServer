import { SiteInfoEntity } from "./siteInfoEntity";
import validator from "validator";
import { SiteInfoDalLogger } from "../logger/siteInfoLogger";
import { MongoDb } from "../config/mongodb";

export interface SiteInfoDal {
  updateOne(id: string, entity: SiteInfoEntity): Promise<boolean>;
  findOne(id: string): Promise<SiteInfoEntity>;
}

export class SiteInfoDalConc implements SiteInfoDal {
  logger: any;

  constructor() {
    this.logger = new SiteInfoDalLogger();
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

  async updateOne(id: string, entity: SiteInfoEntity): Promise<boolean> {
    let result;
    try {
      const collection = MongoDb.dbconnect("siteInfos");
      await collection.then((siteInfo) => {
        result = siteInfo.updateOne(
          { _id: "1" },
          {
            $set: {
              _id: "1",
              address1: entity.address1,
              address2: entity.address2,
              tel1: entity.tel1,
              tel2: entity.tel2,
              mobile1: entity.mobile1,
              mobile2: entity.mobile2,
              email1: entity.email1,
              email2: entity.email2,
              twitter: entity.twitter,
              instagram: entity.instagram,
              headerImages: entity.headerImages,
              logo1: entity.logo1,
              logo2: entity.logo2,
              footerImage1: entity.footerImage1,
              footerImage2: entity.footerImage2,
              headerTitle: entity.headerTitle,
              footerDescription: entity.footerDescription,
              copyRightText: entity.copyRightText,
              copyRightYear: entity.copyRightYear,
            },
          },
          { upsert: true }
        );
      });
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
    }
    return result;
  }
}

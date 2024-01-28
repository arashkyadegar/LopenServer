import { SiteInfoEntity } from "../siteInfo/siteInfoEntity";
import { SiteInfoDal } from "./siteInfoWbDal";

export interface SiteInfoBus {
  findOne(id: string): Promise<SiteInfoEntity>; //returns found object.
}

export class SiteInfoBusConc implements SiteInfoBus {
  private db: SiteInfoDal;
  constructor(db: SiteInfoDal) {
    this.db = db;
  }
  async findOne(id: string): Promise<SiteInfoEntity> {
    const result = await this.db.findOne("1");
    return result;
  }

}

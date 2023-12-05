import { SiteInfoEntity } from "./siteInfoEntity";
import { SiteInfoDal } from "./siteInfoDal";

export interface SiteInfoBus {
  findOne(id: string): Promise<SiteInfoEntity>; //returns found object.
  updateOne(id: string, entity: SiteInfoEntity): Promise<boolean>; //returns true if update is succefull otherwise false.
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
  async updateOne(id: string, entity: SiteInfoEntity): Promise<boolean> {
    const result = await this.db.updateOne("1", entity);
    return result;
  }
}

import { FactorDetailDal } from "./factorDetailDal";
import { FactorDetailEntity } from "./factorDetailEntity";

export interface FactorDetailBus {
  //updateOne(id: string, entity: FactorDetailEntity): Promise<boolean>;
  //findOne(id: string): Promise<FactorDetailEntity>;
  //createOne(entity: FactorDetailEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAllByFactorId(factorId: string): Promise<FactorDetailEntity[]>;
}

export class FactorDetailBusConc implements FactorDetailBus {
  private db: FactorDetailDal;
  constructor(db: FactorDetailDal) {
    this.db = db;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  // route manipulation for this
  async findAllByFactorId(factorId: string): Promise<FactorDetailEntity[]> {
    const result = await this.db.findAllByFactorId(factorId);
    return result;
  }
}

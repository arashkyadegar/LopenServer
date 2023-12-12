import { FactorDetailEntity } from "../factorDetail/factorDetailEntity";
import { FactorDetailWbDal } from "./factorDetailWbDal";

export interface FactorDetailWbBus {
  updateOne(id: string, entity: FactorDetailEntity): Promise<boolean>;
  //findOne(id: string): Promise<FactorDetailEntity>;
  createOne(entity: FactorDetailEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(factorId: string): Promise<FactorDetailEntity[]>;
}

export class FactorDetailWbBusConc implements FactorDetailWbBus {
  private db: FactorDetailWbDal;
  constructor(db: FactorDetailWbDal) {
    this.db = db;
  }
  async updateOne(id: string, entity: FactorDetailEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async createOne(entity: FactorDetailEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(factorId: string): Promise<FactorDetailEntity[]> {
     const result = await this.db.findAll(factorId);
     return result;
  }
}

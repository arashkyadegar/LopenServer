import { FactorDetailRouter } from "../factorDetail/factorDetail";
import { FactorDetailEntity } from "../factorDetail/factorDetailEntity";
import { getRandomString } from "../utility/randomStr";
import { FactorDal } from "./factorDal";
import { FactorEntity } from "./factorEntity";

export interface FactorBus {
  updateOne(id: string, entity: FactorEntity): Promise<boolean>;
  findOne(id: string): Promise<FactorEntity>;
  createOne(entity: FactorEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FactorEntity[]>;
}

export class FactorBusConc implements FactorBus {
  private db: FactorDal;
  constructor(db: FactorDal) {
    this.db = db;
  }

  async updateOne(id: string, entity: FactorEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async findOne(id: string): Promise<FactorEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async createOne(entity: FactorEntity): Promise<boolean> {
    entity.factorNumber = getRandomString();
    //console.log(entity);
    const result = await this.db.createOne(entity);
    ///foreach items
    return result;
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<FactorEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
}

import { DiscountDal } from "./discountDal";
import { DiscountEntity } from "./discountEntity";

export interface DiscountBus {
  updateOne(id: string, entity: DiscountEntity): Promise<boolean>;
  findOne(id: string): Promise<DiscountEntity>;
  createOne(entity: DiscountEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<DiscountEntity[]>;
}

export class DiscountBusConc implements DiscountBus {
  private db: DiscountDal;
  constructor(db: DiscountDal) {
    this.db = db;
  }
  async updateOne(id: string, entity: DiscountEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async findOne(id: string): Promise<DiscountEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async createOne(entity: DiscountEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<DiscountEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
}

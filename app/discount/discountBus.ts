import { date } from "joi";
import { DiscountDal } from "./discountDal";
import { DiscountEntity } from "./discountEntity";
import { converEnDateToFaDate, converFaDateToEnDate } from "./discountUtility";

export interface DiscountBus {
  updateOne(id: string, entity: DiscountEntity): Promise<boolean>;
  findOne(id: string): Promise<DiscountEntity>;
  createOne(entity: DiscountEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<DiscountEntity[]>;
  findByProductId(productId: string): Promise<boolean>;
}

export class DiscountBusConc implements DiscountBus {
  private db: DiscountDal;
  constructor(db: DiscountDal) {
    this.db = db;
  }
  async findByProductId(productId: string): Promise<boolean> {
    const result = await this.db.findByProductId(productId);
    console.log(result);
    if (result.length <= 0) return false;
    return true;
  }
  async updateOne(id: string, entity: DiscountEntity): Promise<boolean> {
    entity.sDate = converFaDateToEnDate(entity.sDate);
    entity.eDate = converFaDateToEnDate(entity.eDate);
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async findOne(id: string): Promise<DiscountEntity> {
    let result = await this.db.findOne(id);
    result[0].sDate = converEnDateToFaDate(result[0].sDate);
    result[0].eDate = converEnDateToFaDate(result[0].eDate);
    return result;
  }
  async createOne(entity: DiscountEntity): Promise<boolean> {
    entity.sDate = converFaDateToEnDate(entity.sDate);
    entity.eDate = converFaDateToEnDate(entity.eDate);
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

  async findDiscountsByDate(date: Date) {}
}

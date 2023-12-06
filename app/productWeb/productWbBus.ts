import { ProductEntity } from "../product/productEntity";
import { ProductWbDal } from "./productWbDal";

export interface ProductWbBus {
  updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
}

export class ProductWbBusConc implements ProductWbBus {
  private db: ProductWbDal;
  constructor(db: ProductWbDal) {
    this.db = db;
  }
  async findAll(): Promise<ProductEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<ProductEntity> {
    const result = await this.db.findOne("1");
    return result;
  }
  async updateOne(id: string, entity: ProductEntity): Promise<boolean> {
    const result = await this.db.updateOne("1", entity);
    return result;
  }
}

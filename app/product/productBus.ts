import { ProductEntity } from "./productEntity";
import { ProductDal } from "./productDal";

export interface ProductBus {
  updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string): Promise<ProductEntity>;
  createOne(entity: ProductEntity): Promise<boolean>;
  deleteSoftOneProduct(id: string): Promise<boolean>;
  findAll(): Promise<ProductEntity[]>;
}

export class ProductBusConc implements ProductBus {
  private db: ProductDal;
  constructor(db: ProductDal) {
    this.db = db;
  }
  async createOne(entity: ProductEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
  deleteSoftOneProduct(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<ProductEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<ProductEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async updateOne(id: string, entity: ProductEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
}

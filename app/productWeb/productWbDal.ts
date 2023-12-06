import { ProductEntity } from "../product/productEntity";
import validator from "validator";
import { ProductDalLogger } from "../logger/productLogger";
import { MongoDb } from "../config/mongodb";

export interface ProductWbDal {
  updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
}
export class ProductWbDalConc implements ProductWbDal {
  logger: any;
  constructor() {
    this.logger = new ProductDalLogger();
  }
  async updateOne(id: string, entity: ProductEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
  findOne(id: string): Promise<ProductEntity> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<ProductEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.find({"display":true})
        .sort({ name: 1, date: -1 })
        .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}

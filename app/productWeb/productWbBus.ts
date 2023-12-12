import { ProductEntity, ProductWbEntity } from "../product/productEntity";
import { ProductWbDal } from "./productWbDal";

export interface ProductWbBus {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string, wbuserId: string): Promise<ProductEntity>;
  findAll(): Promise<ProductWbEntity[]>;
}

export class ProductWbBusConc implements ProductWbBus {
  private db: ProductWbDal;
  constructor(db: ProductWbDal) {
    this.db = db;
  }
  async findAll(): Promise<ProductWbEntity[]> {
    const result = await this.db.findAll();
    result.forEach((element) => {
      element.score = this.calculateScore(element);
    });
    return result;
  }
  async findOne(id: string, wbuserId: string): Promise<ProductWbEntity> {
    const result = await this.db.findOne(id);
    //calculating product's score
    // const scoreCount = result[0].scores.length;
    // let totalScore = 0;

    // result[0].scores.forEach((element) => {
    //   totalScore = totalScore + element.value;
    // });

    // result[0].score = totalScore / scoreCount;
    result[0].score = this.calculateScore(result[0]);
    //calculating product's score ///////////////////////end

    //check if user has liked the product or not
    // if (wbuserId != "") {
    //   result[0].likes.forEach((element) => {
    //     if (element.wbuserId == wbuserId) {
    //       result[0].liked = true;
    //     }
    //   });
    // }
    if (wbuserId != "") {
      result[0].liked = this.checkLikesByUser(wbuserId, result[0]);
    }
    //check if user has liked the product or not////////////end
    return result;
  }
  calculateScore(entity: ProductWbEntity): number {
    const scoreCount = entity.scores.length;
    let totalScore = 0;

    entity.scores.forEach((element) => {
      totalScore = totalScore + element.value;
    });

    return totalScore / scoreCount;
  }

  checkLikesByUser(wbuserId: string, entity: ProductWbEntity): boolean {
    let result = false;
    entity.likes.forEach((element) => {
      if (element.wbuserId == wbuserId) {
        result = true;
      }
    });
    return result;
  }
}

import { ProductWbEntity } from "../product/productEntity";
import { ProductWbDal } from "./productWbDal";
import { checkLikesByUser } from "../likeWeb/likeWbUtility";
import { calculateScore } from "../scoreWeb/scoreWbUtility";
import { checkIfDiscountIsAllowed } from "../discount/discountUtility";
var _ = require("lodash");

export interface ProductWbBus {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string, wbuserId: string): Promise<ProductWbEntity>;
  findAll(): Promise<ProductWbEntity[]>;
  findByPage(page: number): Promise<ProductWbEntity[]>;
}

export class ProductWbBusConc implements ProductWbBus {
  private db: ProductWbDal;
  constructor(db: ProductWbDal) {
    this.db = db;
  }
  async findByPage(page: number): Promise<ProductWbEntity[]> {
    const result = await this.db.findByPage(page);
    return result;
  }
  async findAll(): Promise<ProductWbEntity[]> {
    const today = new Date();
    const result = await this.db.findAll(today.toISOString());
    result.forEach((element) => {
      element.score = calculateScore(element);
      if (element.discounts.length > 0) {
        let discount = _.first(element.discounts);
        let temp = checkIfDiscountIsAllowed(discount);
        element.discounts = temp;
      }
    });
    return result;
  }
  async findOne(id: string, wbuserId: string): Promise<ProductWbEntity> {
    const today = new Date();
    const result = await this.db.findOne(id, today.toISOString());
    //console.log(result[0].discounts);
    //check if product discount is allowed or not
    if (result[0].discounts.length > 0) {
      let element = _.first(result[0].discounts);
      let temp = checkIfDiscountIsAllowed(element);
      result[0].discounts = temp;
    }
    //check if product discount is allowed or not/////end

    //calculating product's score
    const scoreCount = result[0].scores.length;
    let totalScore = 0;
    result[0].score = totalScore / scoreCount;
    result[0].score = calculateScore(result[0]);
    //calculating product's score ///////////////////////end

    //check if user has liked the product or not
    if (wbuserId != "") {
      result[0].liked = checkLikesByUser(wbuserId, result[0]);
    }
    //console.log(result[0].discounts);
    //check if user has liked the product or not////////////end
    return result;
  }


}

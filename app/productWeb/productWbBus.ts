import { date } from "joi";
import { ProductEntity, ProductWbEntity } from "../product/productEntity";
import { ProductWbDal } from "./productWbDal";
import { DiscountEntity } from "../discount/discountEntity";
import { checkLikesByUser } from "../likeWeb/likeWebUtility";
var _ = require("lodash");

export interface ProductWbBus {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string, wbuserId: string): Promise<ProductWbEntity>;
  findAll(): Promise<ProductWbEntity[]>;
}

export class ProductWbBusConc implements ProductWbBus {
  private db: ProductWbDal;
  constructor(db: ProductWbDal) {
    this.db = db;
  }
  async findAll(): Promise<ProductWbEntity[]> {
    const today = new Date();
    const result = await this.db.findAll(today.toISOString());
    result.forEach((element) => {
      element.score = this.calculateScore(element);
      if (element.discounts.length > 0) {
        let discount = _.first(element.discounts);
        let temp = this.checkIfDiscountIsAllowed(discount);
        element.discounts = temp;
      }
    });
    return result;
  }
  async findOne(id: string, wbuserId: string): Promise<ProductWbEntity> {
    const today = new Date();
    const result = await this.db.findOne(id, today.toISOString());

    //check if product discount is allowed or not
    if (result[0].discounts.length > 0) {
      let element = _.first(result[0].discounts);
      let temp = this.checkIfDiscountIsAllowed(element);
      result[0].discounts = temp;
    }
    //check if product discount is allowed or not/////end

    //calculating product's score
    const scoreCount = result[0].scores.length;
    let totalScore = 0;
    result[0].score = totalScore / scoreCount;
    result[0].score = this.calculateScore(result[0]);
    //calculating product's score ///////////////////////end

    //check if user has liked the product or not
    if (wbuserId != "") {
      result[0].liked = checkLikesByUser(wbuserId, result[0]);
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
  checkIfDiscountIsAllowed(discount: any): DiscountEntity[] {
    let today = new Date();
    const sd = discount.sDate.toISOString().substring(0, 10);
    const ed = discount.eDate.toISOString().substring(0, 10);
    const td = today.toISOString().substring(0, 10);

    console.log(td);
    console.log(sd);
    console.log(ed);

    if (td >= sd && td <= ed) {
      return discount;
    } else {
      return [];
    }
  }
}

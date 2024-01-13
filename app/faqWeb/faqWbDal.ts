import { MongoDb } from "../config/mongodb";
import { FaqEntity } from "../faq/faqEntity";
import { FaqWbDalLogger } from "../logger/faqLogger";

export interface FaqWbDal {
  findAll(): Promise<FaqEntity[]>;
}

export class FaqWbDalConc implements FaqWbDal {
  logger: any;
  constructor() {
    this.logger = new FaqWbDalLogger();
  }
  async findAll(): Promise<FaqEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs
          .find()
          .sort({ priority: 1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}

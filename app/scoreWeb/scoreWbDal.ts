import { MongoDb } from "../config/mongodb";
import { ScoreWbDalLogger } from "../logger/scoreWbLogger";
import { ScoreEntity } from "../score/scoreEntity";

var ObjectId = require("mongodb").ObjectId;

export interface ScoreWbDal {
  updateOneScore(scoreEntity: ScoreEntity): Promise<boolean>;
}

export class ScoreWbDalConc implements ScoreWbDal {
  logger: any;
  constructor() {
    this.logger = new ScoreWbDalLogger();
  }
  async updateOneScore(scoreEntity: ScoreEntity): Promise<boolean> {
    let result;
    try {
      let wbuserIdObjectId = new ObjectId(scoreEntity.wbuserId);
      let productIdObjectId = new ObjectId(scoreEntity.productId);
      const collection = MongoDb.dbconnect("scores");
      await collection.then((scores) => {
        result = scores.updateOne(
          {
            wbuserId: wbuserIdObjectId,
            productId: productIdObjectId,
          },
          { $set: { value: scoreEntity.value, date: Date.now() } },
          { upsert: true }
        );
      });
    } catch (err: any) {
      this.logger.logError(err, "updateOneScore");
    }
    return result;
  }
}

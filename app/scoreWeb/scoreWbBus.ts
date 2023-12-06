import { ScoreEntity } from "../score/scoreEntity";
import { ScoreWbDal } from "./scoreWbDal";

export interface ScoreWbBus {
  updateOneScore(id:string,scoreEntity: ScoreEntity): Promise<boolean>;
}

export class ScoreWbBusConc implements ScoreWbBus {
  private db: ScoreWbDal;
  constructor(db: ScoreWbDal) {
    this.db = db;
  }

  async updateOneScore(id:string,scoreEntity: ScoreEntity): Promise<boolean> {
    const result = await this.db.updateOneScore(scoreEntity);
    return result;
  }
}

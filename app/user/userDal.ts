import { UserEntity } from "./userEntity";
import { UserDalLogger } from "../logger/userLogger";
import { MongoDb } from "../config/mongodb";
var ObjectId = require("mongodb").ObjectId;
export interface UserDal {
  findOneByUserName(id: string): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity>;
  createOne(entity: UserEntity): Promise<boolean>;
}
export class UserDalConc implements UserDal {
  logger: any;
  constructor() {
    this.logger = new UserDalLogger();
  }
  findOneByUserName(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async createOne(entity: UserEntity): Promise<boolean> {
    let result;
    try {
      const collection = MongoDb.dbconnect("users");
      await collection.then((users) => {
        result = users.insertOne({
          username: entity.username,
          password: entity.password,
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    }
    return result;
  }
}

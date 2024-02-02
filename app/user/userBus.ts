import { UserEntity } from "./userEntity";
import { UserDal } from "./userDal";

export interface UserBus {
  findOneByUserName(id: string): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity>;
  createOne(entity: UserEntity): Promise<boolean>;
}

export class UserBusConc implements UserBus {
  private db: UserDal;
  constructor(db: UserDal) {
    this.db = db;
  }
  findOneByUserName(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async createOne(entity: UserEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
}

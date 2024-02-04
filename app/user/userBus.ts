import { UserEntity } from "./userEntity";
import { UserDal } from "./userDal";
import validator from "validator";
import { HashPassword } from "../utility/hashUtility";
export interface UserBus {
  findOneByUserName(entity: UserEntity): Promise<UserEntity[]>;
  findOneById(id: string): Promise<UserEntity>;
  createOne(entity: UserEntity): Promise<boolean>;
  findOneForLogin(entity: UserEntity): Promise<boolean>;
}

export class UserBusConc implements UserBus {
  private db: UserDal;
  constructor(db: UserDal) {
    this.db = db;
  }
  findOneForLogin(entity: UserEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findOneByUserName(entity: UserEntity): Promise<UserEntity[]> {
    const result = await this.db.findOneByUserName(entity.username);
    if (result.length) {
      const hashUtiliy = new HashPassword();
      const passCheck = await hashUtiliy.validateUser(
        entity.password,
        result[0].password
      );

    }
    return result;
  }

  findOneById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async createOne(entity: UserEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
}

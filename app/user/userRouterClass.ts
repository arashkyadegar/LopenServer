import validator from "validator";
import { UserBus } from "./userBus";
import { ResponseStatus } from "../utility/errorStatus";
import { UserEntity, UserSchema } from "./userEntity";
import { UserRouterClassLogger } from "../logger/userLogger";
import { validatePassword } from "../utility/regexValidate";
import { HashPassword } from "../utility/hashUtility";

export class UserRouterClass {
  bus: UserBus;
  logger: any;
  constructor(b: UserBus) {
    this.bus = b;
    this.logger = new UserRouterClassLogger();
  }

  async createOne(req, res, next): Promise<any> {
    let result;
    const userEntity = req.body as UserEntity;
    const { error } = UserSchema.validate(userEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    const passwordStrengh = validatePassword(userEntity.password);
    if (passwordStrengh < 5) {
      const errorResponse = `validation failed. errors: weak password `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
 
    const decoder = new HashPassword();
    const username_hash = await decoder.createHash(userEntity.username);
    const password_hash = await decoder.createHash(userEntity.password);

    let hashedUser = new UserEntity();
    hashedUser.username = username_hash;
    hashedUser.password = password_hash;

    result = await this.bus.createOne(hashedUser);
    return {
      status: ResponseStatus.OK,
      message: 'user created',
    };
  }
}

module.exports = { UserRouterClass };

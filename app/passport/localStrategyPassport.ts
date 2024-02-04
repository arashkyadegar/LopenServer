import { use } from "passport";
import { UserBusConc } from "../user/userBus";
import { UserDalConc } from "../user/userDal";
import { ResponseStatus } from "../utility/errorStatus";
import { HashPassword } from "../utility/hashUtility";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { UserEntity } from "../user/userEntity";
var LocalStrategy = require("passport-local").Strategy;
export const LocalPassport = (passport: any, strategy: any) => {
  const logger = require("../utility/logger");
  const userBus = new UserBusConc(new UserDalConc());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
        session: false,
      },
      async (req: Request, email: string, password: string, done: any) => {
        try {
          let result;
          const encoder = new Base64();
          const user = new UserEntity();
          user.password = password;
          user.username = email;
          result = await userBus.findOneByUserName(user);

          if (result.length == 1) {
            const hashUtiliy = new HashPassword();
            const passCheck = await hashUtiliy.validateUser(
              password,
              result[0].password
            );
            if (passCheck) {
              const token = jwt.sign(
                { user_id: result._id, email },
                process.env.SECRET_KEY || "abc", ///temprory TOKEN_KEY
                {
                  expiresIn: "1h",
                }
              );
              const encodedToken = encoder.encode(token);

              const user: any[] = [];
              user.push({
                email: email,
                token: encodedToken,
              });
              return done(null, user[0]);
            } else {
              return done(null, {
                status: ResponseStatus.NOT_FOUND,
                message: "invalid pass",
                user: undefined,
              });
            }
          } else {
            return done(null, {
              status: ResponseStatus.NOT_FOUND,
              message: "invalid user",
              user: undefined,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};

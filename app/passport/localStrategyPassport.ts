import { use } from "passport";
// import { UserBusConc } from "../user/userBus";
// import { UserDalConc } from "../user/userDal";
import { ResponseStatus } from "../utility/errorStatus";
import { HashPassword } from "../utility/hashUtility";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
var LocalStrategy = require("passport-local").Strategy;
export const LocalPassport = (passport: any, strategy: any) => {
  const logger = require("../utility/logger");
  // const userBus = new UserBusConc(new UserDalConc());
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
          const encoder = new Base64();
          if (email === "admin") {
            if (password === "admin") {
              // Create token
              const token = jwt.sign(
                { user_id: "user[0]._id", email },
                process.env.SECRET_KEY || "abc", ///temprory TOKEN_KEY
                {
                  expiresIn: "1h",
                }
              );
              // console.log(token);
              const encodedToken = encoder.encode(token);
              // console.log('-----/n')
              // console.log(encodedToken);
              // save user token
              const user: any[] = [];
              user.push({
                email:email,
                token: encodedToken,
              });

              return done(null, {
                status: ResponseStatus.OK,
                message: "ok",
                user: user[0],
              });
            } else {
              return done(null, {
                status: ResponseStatus.BAD_REQUEST,
                message: "invalid password",
                user: null,
              });
            }
          } else {
            return done(null, {
              status: ResponseStatus.NOT_FOUND,
              message: "invalid username",
              user: null,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};

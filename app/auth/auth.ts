import express, { query } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { LocalPassport } from "../passport/localStrategyPassport";
import { UserEntity } from "../user/userEntity";
export const AuthRouter = express.Router();
LocalPassport(passport, LocalStrategy.Strategy);
import dayjs from "dayjs";
import { ResponseStatus } from "../utility/errorStatus";

////////////////////local Login/////////////////////////////
AuthRouter.post(
  "/login/",
  passport.authenticate("local", { session: false }),
  async (req: any, res) => {
    var cookie = require("cookie");
    const user = req.user;
    if (user != undefined) {
      try {
        // res.cookie("usercookie", JSON.stringify(user), {
        //   secure: process.env.NODE_ENV !== "development",
        //   //httpOnly: true,
        //   expires: dayjs().add(10, "days").toDate(),
        // });
        res.clearCookie("x-fighter");
        // res.cookie("usercookie", JSON.stringify(user), {
        //   secure: true,
        //   httpOnly: false,
        //   sameSite: "none",
        //   // secure: process.env.MODE_ENV !== "development",
        //   maxAge: 60 * 60 * 24 * 31,
        //   path: "/",
        //   domain: "localhost:3000"
        // });
        res.cookie("alonefighterx", JSON.stringify(user.user), {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        });
        // res.cookie(
        //   "Set-Cookie",
        //   cookie.serialize("usercookie", String("arashkyadegar"), {
        //     maxAge: 60 * 1000,
        //     secure: false,
        //     httpOnly: false,
        //     sameSite: "lax",
        //   })
        // );
        // res.setHeader(
        //   "Set-Cookie",
        //   cookie.serialize("name", String(query.name), {
        //     maxAge: 60 * 1000,
        //     secure: false,
        //     httpOnly: false,
        //     sameSite: "lax",
        //   })
        // );
        // res.cookie("usercookie", "usercookie_value", {
        //   maxAge: 60 * 1000,
        //   secure: false,
        //   httpOnly: false,
        //   sameSite:"lax"
        // });
         res.status(ResponseStatus.OK).send(user);
      } catch (error) {
        res.send({ rslt: "not true" });
      }
    } else {
      res.statusCode = 404;
      res.send("Error");
    }
  }
);

module.exports = AuthRouter;

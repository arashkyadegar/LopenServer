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
    const user = req.user;
    if (user.email) {
      try {
        res.clearCookie("alonefighterx");
        res.cookie("alonefighterx", JSON.stringify(user), {
          maxAge: 900000,
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(ResponseStatus.OK).json({ user: "logged" });
      } catch (error) {
        res.statusCode = 404;
        res.send("Error");
      }
    } else {
      res.statusCode = 404;
      res.send("Error");
    }
  }
);

module.exports = AuthRouter;

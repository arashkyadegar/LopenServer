import express from "express";
import { UserRouterLogger } from "../logger/userLogger";
import { UserBusConc } from "./userBus";
import { UserDalConc } from "./userDal";

import { checkAuthorize } from "../middleware/authorize";
import { validatePassword } from "../utility/regexValidate";
import { createHash } from "crypto";
import { HashPassword } from "../utility/hashUtility";
import { UserRouterClass } from "./userRouterClass";

export const UserRouter = express.Router();

UserRouter.post("/", async function (req, res, next) {
  try {
    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }

  // try {
  //   const decoder = new HashPassword();
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   const result = validatePassword(password);

  //   const username_hash = await decoder.createHash(username);
  //   const password_hash = await decoder.createHash(password);

  //   console.log(result);
  //   return res
  //     .status(200)
  //     .json({ username_hash: username_hash, password_hash: password_hash });
  // } catch (err: any) {
  //   const logger = new UserRouterLogger();
  //   logger.logError(err, "post /");
  //   next(err);
  // }
});

module.exports = UserRouter;

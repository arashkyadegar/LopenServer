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

});

module.exports = UserRouter;

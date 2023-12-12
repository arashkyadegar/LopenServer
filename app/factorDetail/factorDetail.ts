import express from "express";
import { FactorDetailRouterLogger } from "../logger/factorDetailLogger";
import { FactorDetailBusConc } from "./factorDetailBus";
import { FactorDetailDalConc } from "./factorDetailDal";
import { FactorDetailRouterClass } from "./factorDetailRouterClass";

export const FactorDetailRouter = express.Router();

FactorDetailRouter.get("/:fid", async function (req, res, next) {
  try {
    const bus = new FactorDetailBusConc(new FactorDetailDalConc());
    const router = new FactorDetailRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailRouterLogger();
    logger.logError(err, "get /:fid");
    next(err);
  }
});

FactorDetailRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new FactorDetailBusConc(new FactorDetailDalConc());
    const router = new FactorDetailRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

module.exports = FactorDetailRouter;

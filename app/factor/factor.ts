import express from "express";
import { FactorBusConc } from "./factorBus";
import { FactorDalConc } from "./factorDal";
import { FactorRouterLogger } from "../logger/factorLogger";
import { FactorRouterClass } from "./factorRouterClass";
export const FactorRouter = express.Router();

FactorRouter.get("/", async function (req, res, next) {
  try {
    const bus = new FactorBusConc(new FactorDalConc());
    const router = new FactorRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

FactorRouter.get("/:id", async function (req, res, next) {
  try {
    const postBus = new FactorBusConc(new FactorDalConc());
    const router = new FactorRouterClass(postBus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

FactorRouter.post("/", async function (req, res, next) {
  try {
    const postBus = new FactorBusConc(new FactorDalConc());
    const router = new FactorRouterClass(postBus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

FactorRouter.put("/:id", async function (req, res, next) {
  try {
    const postBus = new FactorBusConc(new FactorDalConc());
    const router = new FactorRouterClass(postBus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = FactorRouter;

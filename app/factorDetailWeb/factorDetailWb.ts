import express from "express";
import { FactorDetailWbDalConc } from "./factorDetailWbDal";
import { FactorDetailWbRouterClass } from "./factorDetailWbRouterClass";
import { FactorDetailWbBusConc } from "./factorDetailWbBus";
import { FactorDetailWbRouterClassLogger } from "../logger/factorDetailLogger";
export const FactorDetailWbRouter = express.Router();

FactorDetailWbRouter.get("/:fid", async function (req, res, next) {
  try {
    const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
    const router = new FactorDetailWbRouterClass(bus);
    const result = await router.findAllByFactorId(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailWbRouterClassLogger();
    logger.logError(err, "get /:fid");
    next(err);
  }
});

FactorDetailWbRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
    const router = new FactorDetailWbRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailWbRouterClassLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

FactorDetailWbRouter.post("/", async function (req, res, next) {
  try {
    const postBus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
    const router = new FactorDetailWbRouterClass(postBus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailWbRouterClassLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

FactorDetailWbRouter.put("/:id", async function (req, res, next) {
  try {
    const postBus = new FactorDetailWbBusConc(new FactorDetailWbDalConc());
    const router = new FactorDetailWbRouterClass(postBus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FactorDetailWbRouterClassLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = FactorDetailWbRouter;

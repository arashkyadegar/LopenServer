import express from "express";
import { FaqRouterLogger } from "../logger/faqLogger";
import { FaqBusConc } from "./faqBus";
import { FaqDalConc } from "./faqDal";
import { FaqRouterClass } from "./faqRouterClass";
import { checkAuthorize } from "../middleware/authorize";

export const FaqRouter = express.Router();

FaqRouter.get("/", checkAuthorize, async function (req, res, next) {
  try {

    const bus = new FaqBusConc(new FaqDalConc());
    const router = new FaqRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

FaqRouter.get("/:id",checkAuthorize, async function (req, res, next) {
  try {
    console.log(req)
    const bus = new FaqBusConc(new FaqDalConc());
    const router = new FaqRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

FaqRouter.delete("/:id", checkAuthorize, async function (req, res, next) {
  try {
    const bus = new FaqBusConc(new FaqDalConc());
    const router = new FaqRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

FaqRouter.post("/", checkAuthorize, async function (req, res, next) {
  try {
    const bus = new FaqBusConc(new FaqDalConc());
    const router = new FaqRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

FaqRouter.put("/:id", checkAuthorize, async function (req, res, next) {
  try {
    const bus = new FaqBusConc(new FaqDalConc());
    const router = new FaqRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = FaqRouter;

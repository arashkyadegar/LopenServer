import express from "express";
import { CommentWbBusConc } from "./commentWbBus";
import { CommentWbDalConc } from "./commentWbDal";
import { CommentWbRouterLogger } from "../logger/commentLogger";
import { CommentWbRouterClass } from "./commentWbRouterClass";
export const CommentRouter = express.Router();

CommentRouter.get("/:wbuserId", async function (req, res, next) {
  try {
    const bus = new CommentWbBusConc(new CommentWbDalConc());
    const router = new CommentWbRouterClass(bus);
    const result = await router.findAllBywbuserId(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentWbRouterLogger();
    logger.logError(err, "get /:wbuserId");
    next(err);
  }
});

CommentRouter.post("/", async function (req, res, next) {
  try {
    const bus = new CommentWbBusConc(new CommentWbDalConc());
    const router = new CommentWbRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentWbRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

module.exports = CommentRouter;

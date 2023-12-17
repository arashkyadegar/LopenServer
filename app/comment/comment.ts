import express from "express";
import { CommentRouterLogger } from "../logger/commentLogger";
import { CommentBusConc } from "./commentBus";
import { CommentDalConc } from "./commentDal";
import { CommentRouterClass } from "./commentRouterClass";

export const CommentRouter = express.Router();
CommentRouter.get("/", async function (req, res, next) {
  try {
    const bus = new CommentBusConc(new CommentDalConc());
    const router = new CommentRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

CommentRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new CommentBusConc(new CommentDalConc());
    const router = new CommentRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

CommentRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new CommentBusConc(new CommentDalConc());
    const router = new CommentRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

CommentRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new CommentBusConc(new CommentDalConc());
    const router = new CommentRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CommentRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});

module.exports = CommentRouter;

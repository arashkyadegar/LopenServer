import express from "express";
import { ScoreWbRouterLogger } from "../logger/scoreWbLogger";
import { ScoreWbBusConc } from "./scoreWbBus";
import { ScoreWbDalConc } from "./scoreWbDal";
import { ScoreWbRouterClass } from "./scoreWbRouterClass";

export const ScoreWbRouter = express.Router();

ScoreWbRouter.put("/:id", async function (req, res, next) {
  try {
    const LikeWbBus = new ScoreWbBusConc(new ScoreWbDalConc());
    const router = new ScoreWbRouterClass(LikeWbBus);
    const result = await router.updateOneScore(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ScoreWbRouterLogger();
    logger.logError(err, "post/");
    next(err);
  }
});

module.exports = ScoreWbRouter;

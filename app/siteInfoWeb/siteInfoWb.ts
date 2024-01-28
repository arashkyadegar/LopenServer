import express from "express";
import { SiteInfoBusConc } from "./siteInfoWbBus";
import { SiteInfoDalConc } from "./siteInfoWbDal";
import { SiteInfoWbRouterLogger } from "../logger/siteInfoWbLogger";
import { SiteInfoRouterClass } from "./siteInfoWbRouterClass";
export const SiteInfoWbRouter = express.Router();

SiteInfoWbRouter.get("/", async function (req, res, next) {
  try {
    const bus = new SiteInfoBusConc(new SiteInfoDalConc());
    const router = new SiteInfoRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(200).send(result.message);
  } catch (err: any) {
    const logger = new SiteInfoWbRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = SiteInfoWbRouter;

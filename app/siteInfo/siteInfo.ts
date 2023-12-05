import express from "express";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
import { SiteInfoBusConc } from "./siteInfoBus";
import { SiteInfoDalConc } from "./siteInfoDal";
import {
  SiteInfoRouterClassLogger,
  SiteInfoRouterLogger,
} from "../logger/siteInfoLogger";
import { SiteInfoRouterClass } from "./siteInfoRouterClass";
export const SiteInfoRouter = express.Router();

SiteInfoRouter.put("/", async function (req, res, next) {
  try {
    const bus = new SiteInfoBusConc(new SiteInfoDalConc());
    const router = new SiteInfoRouterClass(bus);
    const result = await router.updateOneSiteInfo(req, res, next);

    return res.status(200).send(result);
  } catch (err: any) {
    const logger = new SiteInfoRouterLogger();
    logger.logError(err, "siteInfo");
    next(err);
  }
});

SiteInfoRouter.get("/", async function (req, res, next) {
  try {
    const bus = new SiteInfoBusConc(new SiteInfoDalConc());
    const router = new SiteInfoRouterClass(bus);
    const result = await router.fineOneSiteInfo(req, res, next);
    return res.status(200).send(result);
  } catch (err: any) {
    const logger = new SiteInfoRouterLogger();
    logger.logError(err, "siteInfo");
    next(err);
  }
});

module.exports = SiteInfoRouter;

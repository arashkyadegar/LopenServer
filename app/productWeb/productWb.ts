import express from "express";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductWbBusConc } from "./productWbBus";
import { ProductWbDalConc } from "./productWbDal";
import { ProductWbRouterClassLogger } from "../logger/productLogger";
import { ProductWbRouterClass } from "./productWbRouterClass";
export const ProductWbRouter = express.Router();

ProductWbRouter.get("/", async function (req, res, next) {
  try {
    const postBus = new ProductWbBusConc(new ProductWbDalConc());
    const router = new ProductWbRouterClass(postBus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductWbRouterClassLogger();
    logger.logError(err, "Product");
    next(err);
  }
});

ProductWbRouter.get("/:id", async function (req, res, next) {
  try {
    const postBus = new ProductWbBusConc(new ProductWbDalConc());
    const router = new ProductWbRouterClass(postBus);
    const result = await router.findOneProduct(req, res, next);

    return res.status(200).send(result.message);
  } catch (err: any) {
      const logger = new ProductWbRouterClassLogger();
      logger.logError(err, "get /:id");
    next(err);
  }
});

ProductWbRouter.put("/:id", async function (req, res, next) {
  try {
    //   const postBus = new PostBusConc(new PostDalConc());
    //   const router = new PostRouterClass(postBus);
    //   const result = await router.findAll(req, res, next);

    return res.status(200).send({ payload: "hi this is me" });
  } catch (err: any) {
    //   const logger = new PostRouterLogger();
    //   logger.logError(err, "post");
    // next(err);
  }
});
module.exports = ProductWbRouter;

import express from "express";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductBusConc } from "./productBus";
import { ProductDalConc } from "./productDal";
import { ProductRouterLogger } from "../logger/productLogger";
import { ProductRouterClass } from "./productRouterClass";
export const ProductRouter = express.Router();

ProductRouter.get("/", async function (req, res, next) {
  try {
    const postBus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(postBus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "Product");
    next(err);
  }
});

ProductRouter.get("/:id", async function (req, res, next) {
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

ProductRouter.post("/", async function (req, res, next) {
  try {
    const postBus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(postBus);
    const result = await router.createOneProduct(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "Product");
    next(err);
  }
});

ProductRouter.put("/:id", async function (req, res, next) {
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
module.exports = ProductRouter;

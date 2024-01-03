import express from "express";
import { ProductBusConc } from "./productBus";
import { ProductDalConc } from "./productDal";
import { ProductRouterLogger } from "../logger/productLogger";
import { ProductRouterClass } from "./productRouterClass";
export const ProductRouter = express.Router();

ProductRouter.get("/", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

ProductRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

ProductRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.deleteSoftOneProduct(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

ProductRouter.post("/", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

ProductRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});




module.exports = ProductRouter;

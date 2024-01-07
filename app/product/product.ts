import express from "express";
import { ProductBusConc } from "./productBus";
import { ProductDalConc } from "./productDal";
import { ProductRouterLogger } from "../logger/productLogger";
import { ProductRouterClass } from "./productRouterClass";
import { ResponseStatus } from "../utility/errorStatus";
export const ProductRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file);
    cb(null, Date.now() + file.originalname + ".png");
  },
});
const upload = multer({ storage: storage });
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

ProductRouter.post("/", upload.none(), async function (req: any, res, next) {
  try {
    // const result: any = [];
    // console.log(req.body);

    // //const fileName = validator.escape(req.file.filename);
    // return res.status(ResponseStatus.OK).send({
    //   files: result,
    // });

    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(200).send(result);
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

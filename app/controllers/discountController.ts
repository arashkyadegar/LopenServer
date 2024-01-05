import express from "express";
import validator from "validator";
import { DiscountBusConc } from "../discount/discountBus";
import { DiscountDalConc } from "../discount/discountDal";
import { DicsountContorllerRouterLogger } from "../logger/discountLogger";
import { ProductRouterClass } from "../product/productRouterClass";
import { request } from "https";
import { ProductEntity, ProductSchema } from "../product/productEntity";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductBusConc } from "../product/productBus";
import { ProductDalConc } from "../product/productDal";
import { DiscountEntity, DiscountSchema } from "../discount/discountEntity";
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
export const DiscountContorllerRouter = express.Router();

// create product
DiscountContorllerRouter.get("/create", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await bus.findAll();
    //return res.status(result.status).send(result.message);
    res.render("discountCreate", { products: result });
  } catch (err: any) {
    const logger = new DicsountContorllerRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

// index product
DiscountContorllerRouter.get("/", async function (req, res, next) {
  try {
    //   const bus = new ProductBusConc(new ProductDalConc());
    //   const router = new ProductRouterClass(bus);
    //   const result = await router.findAll(req, res, next);
    //   //return res.status(result.status).send(result.message);

    //   res.render("productIndex", { data: result });
    res.render("discountIndex");
  } catch (err: any) {
    const logger = new DicsountContorllerRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

DiscountContorllerRouter.post(
  "/create",
  upload.none(),
  async function (req: any, res, next) {
    const logger = new DicsountContorllerRouterLogger();
    try {
      let result;
      const productBus = new ProductBusConc(new ProductDalConc());
      const productRouter = new ProductRouterClass(productBus);
      const productResult = await productBus.findAll();

      const bus = new DiscountBusConc(new DiscountDalConc());

      let discount = new DiscountEntity();
      discount._id = "";
      discount.sDate = req.body.sDate;
      discount.eDate = req.body.eDate;
      discount.title = req.body.title;
      discount.type = 1;
      discount.value = req.body.value;
      discount.productId = req.body.productId;
      console.log(discount);
      const duplicatedProductId = await bus.findByProductId(discount.productId);

      if (duplicatedProductId) {
        const errorResponse = `validation failed. duplicate productId`;
        logger.logError(errorResponse, "createOne");
        console.log(discount);
        return res.render("discountCreate", {
          products: productResult,
          discount: discount,
          error: { details: [{ message: errorResponse }] },
        });
      }
      // Joi validation options
      const _validationOptions = {
        abortEarly: false, // abort after the last validation error
      };
      const { error } = DiscountSchema.validate(discount, _validationOptions);
      if (error) {
        logger.logError(error, "discount /create");
        console.log(discount);
        return res.render("discountCreate", {
          products: productResult,
          discount: discount,
          error: error,
        });
      } else {
        console.log(discount);
        result = bus.createOne(discount);
        return res.render("discountCreate", { products: productResult });
      }
    } catch (err: any) {
      logger.logError(err, "discount /create");
      next(err);
    }
  }
);

module.exports = DiscountContorllerRouter;

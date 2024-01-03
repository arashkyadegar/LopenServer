import express from "express";
import validator from "validator";
import { ProductBusConc } from "../product/productBus";
import { ProductDalConc } from "../product/productDal";
import {
  ProductContorllerRouterLogger,
  ProductRouterLogger,
} from "../logger/productLogger";
import { ProductRouterClass } from "../product/productRouterClass";
import { request } from "https";
import { ProductEntity, ProductSchema } from "../product/productEntity";
import { ResponseStatus } from "../utility/errorStatus";
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
export const ProductContorllerRouter = express.Router();

// create product
ProductContorllerRouter.get("/create", function (req, res, next) {
  try {
    //res.render("productCreate", { product:{name:'arashk'}, errors: "ssss" });
    res.render("productCreate");
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

ProductContorllerRouter.post(
  "/create",
  upload.array("files"),
  function (req: any, res, next) {
    try {
      let result;
      const bus = new ProductBusConc(new ProductDalConc());
      const logger = new ProductContorllerRouterLogger();
      let product = new ProductEntity();
      product.name = req.body.name;
      product.weight = req.body.weight;
      product.size = req.body.size;
      product.healthId = req.body.healthId;
      product.type = "1";
      product.components = req.body.components;
      product.desc = req.body.desc;
      product.score = req.body.score;
      product.price = req.body.price;
      product.display = req.body.display;
      product.isAvailable = req.body.isAvailable;
      let tags = req.body.tags.trim().split(" ");
      product.image = "";
      product.images = [];
      product.type = "1";
      //product.userId = req.body;

      tags.forEach((element) => {
        product.tags.push(element);
      });

      req.files.forEach((element) => {
        product.images.push(element.filename);
      });

      // Joi validation options
      const _validationOptions = {
        abortEarly: false, // abort after the last validation error
      };
      const { error } = ProductSchema.validate(product, _validationOptions);
      if (error) {
        logger.logError(error, "post /create");
        res.render("productCreate", { product: product, error: error });
      } else {
        result = bus.createOne(product);
        res.render("productCreate");
      }
    } catch (err: any) {
      const logger = new ProductContorllerRouterLogger();
      logger.logError(err, "post /create");
      next(err);
    }
  }
);

// index product
ProductContorllerRouter.get("/", async function (req, res, next) {
  try {
    const bus = new ProductBusConc(new ProductDalConc());
    const router = new ProductRouterClass(bus);
    const result = await router.findAll(req, res, next);
    //return res.status(result.status).send(result.message);

    res.render("productIndex", { data: result });
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

// edit product
ProductContorllerRouter.get("/edit/:id", async function (req, res, next) {
  let result;
  let product = new ProductEntity();
  const bus = new ProductBusConc(new ProductDalConc());
  const logger = new ProductContorllerRouterLogger();
  if (req.params.id === undefined) {
    const errorResponse = `validation failed. id is not provided`;
    logger.logError(errorResponse, "findOne");
    res.render("productEdit", { product: product, error: errorResponse });
  }

  if (!validator.isMongoId(req.params.id.toString())) {
    const errorResponse = `validation failed. id is not valid`;
    logger.logError(errorResponse, "findOne");
    res.render("productEdit", { product: product, error: errorResponse });
  }

  let id = req.params.id;
  result = await bus.findOne(id);

  if (result === undefined) {
    const errorResponse = `item not found.`;
    logger.logError(errorResponse, "findOne");
    res.render("productEdit", { product: product, error: errorResponse });
  }

  res.render("productEdit", { product: result[0] });
});

ProductContorllerRouter.post(
  "/edit/:id",
  upload.array("files"),
  function (req: any, res, next) {
    try {
      let result;
      const bus = new ProductBusConc(new ProductDalConc());
      const logger = new ProductContorllerRouterLogger();
      let product = new ProductEntity();

      product.name = req.body.name;
      product.weight = req.body.weight;
      product.size = req.body.size;
      product.healthId = req.body.healthId;
      product.type = "1";
      product.components = req.body.components;
      product.desc = req.body.desc;
      product.score = req.body.score;
      product.price = req.body.price;
      product.display = req.body.display;
      product.isAvailable = req.body.isAvailable;
      let tags = req.body.tags.trim().split(" ");
      product.image = "";
      product.images = [];
      product.type = "1";
      tags.forEach((element) => {
        product.tags.push(element);
      });

      req.files.forEach((element) => {
        product.images.push(element.filename);
      });

      if (req.params.id === undefined) {
        const errorResponse = `validation failed. id is not provided`;
        logger.logError(errorResponse, "edite");
        return res.render("productEdit", {
          product: product,
          error: { details: [errorResponse] },
        });
      }

      if (!validator.isMongoId(req.params.id.toString())) {
        const errorResponse = `validation failed. id is not valid`;
        logger.logError(errorResponse, "updateOne");
        return res.render("productEdit", {
          product: product,
          error: { details: [errorResponse] },
        });
      }
      let id = req.params.id;
      product._id = id;
      // Joi validation options
      const _validationOptions = {
        abortEarly: false, // abort after the last validation error
      };
      const { error } = ProductSchema.validate(product, _validationOptions);
      if (error) {
        logger.logError(error, "post /create");
        return res.render("productEdit", { product: product, error: error });
      }

      result = bus.updateOne(id, product);
      return res.render("productEdit", { product: product });
    } catch (err: any) {
      const logger = new ProductRouterLogger();
      logger.logError(err, "get /");
      next(err);
    }
  }
);

// delete product
ProductContorllerRouter.get("/delete/:id", function (req, res, next) {
  try {
    res.render("productCreate");
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

ProductContorllerRouter.delete("/delete/:id", function (req, res, next) {
  try {
    //res.render("productCreate");
  } catch (err: any) {
    const logger = new ProductRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = ProductContorllerRouter;

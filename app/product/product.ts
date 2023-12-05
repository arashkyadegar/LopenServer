import express from "express";
import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
export const ProductRouter = express.Router();

ProductRouter.get("/", async function (req, res, next) {
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

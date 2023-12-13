import { DiscountRouterLogger } from "../logger/discountLogger";
import { DiscountBusConc } from "./discountBus";
import { DiscountDalConc } from "./discountDal";
import { DiscountRouterClass } from "./discountRouterClass";

export const DiscountRouter = express.Router();

DiscountRouter.get("/", async function (req, res, next) {
  try {
    const bus = new DiscountBusConc(new DiscountDalConc());
    const router = new DiscountRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new DiscountRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

DiscountRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new DiscountBusConc(new DiscountDalConc());
    const router = new DiscountRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new DiscountRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

DiscountRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new DiscountBusConc(new DiscountDalConc());
    const router = new DiscountRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new DiscountRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

DiscountRouter.post("/", async function (req, res, next) {
  try {
    const bus = new DiscountBusConc(new DiscountDalConc());
    const router = new DiscountRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new DiscountRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

DiscountRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new DiscountBusConc(new DiscountDalConc());
    const router = new DiscountRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new DiscountRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = DiscountRouter;

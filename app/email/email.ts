//send email
// send sms
import express from "express";
import { checkAuthorize } from "../middleware/authorize";
import { MailTransporter } from "./messageTransporter";
import { ResponseStatus } from "../utility/errorStatus";
import { EmailRouterClass } from "./emailRouterClass";
import { EmailBusConc } from "./emailBus";
export const MessageRouter = express.Router();

MessageRouter.post("/", async function (req, res, next) {
  try {
    const bus = new EmailBusConc(new MailTransporter());
    const router = new EmailRouterClass(bus);
    // const mailTransporter = new MailTransporter();
    // const reciever = req.body.reciever;
    // const subject = req.body.subject;
    // const text = req.body.text;
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);

  } catch (err: any) {
    next(err);
  }
});

// FaqRouter.post("/sendSms", checkAuthorize, async function (req, res, next) {
//   try {
//     const bus = new FaqBusConc(new FaqDalConc());
//     const router = new FaqRouterClass(bus);
//     const result = await router.createOne(req, res, next);
//     return res.status(result.status).send(result.message);
//   } catch (err: any) {
//     const logger = new FaqRouterLogger();
//     logger.logError(err, "post /");
//     next(err);
//   }
// });
module.exports = MessageRouter;

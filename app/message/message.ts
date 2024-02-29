//send email
// send sms
import express from "express";
import { checkAuthorize } from "../middleware/authorize";
import { MailTransporter } from "./messageTransporter";
import { ResponseStatus } from "../utility/errorStatus";
export const MessageRouter = express.Router();

MessageRouter.post("/sendEmail", async function (req, res, next) {
  try {
    const mailTransporter = new MailTransporter();
    const reciever = req.body.reciever;
    const subject = req.body.subject;
    const text = req.body.text;
    const result = await mailTransporter.sendMessage(reciever, subject, text);
    const x = {
      status: ResponseStatus.OK,
      message: 's',
    };
    return res.status(x.status).send(x.message);
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

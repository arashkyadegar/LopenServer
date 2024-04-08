import { Console } from "console";
import { EmailLogger } from "../logger/emailLogger";
const nodemailer = require("nodemailer");

export interface MessageTransporter {
  sendMessage(
    reciever: string,
    subject: string,
    text: string
  ): Promise<boolean>;
}

export class MailTransporter implements MessageTransporter {
  transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.c1.liara.email",
      port: 587,
      secure: false, //true
      auth: {
        user: "interesting_allen_fqcdql",
        pass: "32526ab3-4216-41b1-9bc4-885d44b732b9",
      },
    });
  }

  async sendMessage(
    reciever: string,
    subject: string,
    text: string
  ): Promise<boolean> {
    let result;
    try {
      result = await this.transporter.sendMail({
        from: '"lopencandy" <info@lopencandy.ir>',
        to: `${reciever}`,
        subject: `${subject}`,
        text: text,
        html: `<b>${text}</b>`,
      });
      return result;
    } catch (err: any) {
      const logger = new EmailLogger();
      logger.logError(err, "sendMessage /");
      return result;
    }
  }
}
export class SmsTransporter implements MessageTransporter {
  sendMessage(
    reciever: string,
    subject: string,
    text: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

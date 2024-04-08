import { EmailRouterClassLogger } from "../logger/emailLogger";
import { ResponseStatus } from "../utility/errorStatus";
import validator from "validator";
import { EmailEntity, EmailSchema } from "./emailEntity";
import { EmailBus } from "./emailBus";
export class EmailRouterClass {
  bus: EmailBus;
  logger: any;
  constructor(b: EmailBus) {
    this.bus = b;
    this.logger = new EmailRouterClassLogger();
  }
  async createOne(req, res, next): Promise<any> {
    let result;
    const emailEntity = req.body as EmailEntity;
    const { error } = EmailSchema.validate(emailEntity);

    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(emailEntity);

    if (result === undefined) {
      const errorResponse = `sending email failed.`;
      this.logger.logError(errorResponse, "createOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    return {
      status: ResponseStatus.OK,
      message: { mesageId: result.messageId },
    };
  }
}

module.exports = { EmailRouterClass };

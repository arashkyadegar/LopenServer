import { getRandomString } from "../utility/randomStr";
import { EmailEntity } from "./emailEntity";
import { MessageTransporter } from "./messageTransporter";

export interface EmailBus {
  createOne(entity: EmailEntity): Promise<boolean>;
}

export class EmailBusConc implements EmailBus {
  private transporter: MessageTransporter;
  constructor(transporter: MessageTransporter) {
    this.transporter = transporter;
  }

  async createOne(entity: EmailEntity): Promise<boolean> {
    const result = await this.transporter.sendMessage(entity.reciever,entity.subject,entity.text);
    return result;
  }
}

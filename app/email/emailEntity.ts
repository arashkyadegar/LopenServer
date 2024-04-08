const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export interface IEmail {
  _id: string;
  reciever: string;
  subject: string;
  text: string;
  date: Date;
}

export class EmailEntity implements IEmail {
  _id: string = "";
  reciever: string = "";
  subject: string = "";
  text: string = "";
  date!: Date;
}

export const EmailSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  reciever: Joi.string().email(),
  subject: Joi.string(),
  text: Joi.string(),
  desc: Joi.string().allow(""),
});

module.exports = {
  EmailEntity,
  EmailSchema,
};

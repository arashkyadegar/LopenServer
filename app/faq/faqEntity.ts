const Joi = require("joi");
export class FaqEntity {
  _id: string = "";
  groupId: number = 0;
  question: string = "";
  answer: string = "";
  display: boolean = true;
  priority: number = 0;
  date!:Date;
}

export const FaqSchema = Joi.object({
  _id: Joi.string().allow(''),
  groupId: Joi.number(),
  question: Joi.string(),
  answer: Joi.string(),
  display: Joi.boolean(),
  priority: Joi.number(),
  date: Joi.date().timestamp().allow(''),
});

module.exports = {
  FaqEntity,
  FaqSchema,
};

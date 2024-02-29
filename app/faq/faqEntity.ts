import { rgx_insecure } from "../utility/regexValidate";

const Joi = require("joi");
export class FaqEntity {
  _id: string = "";
  groupId: number = 0;
  question: string = "";
  answer: string = "";
  display: boolean = true;
  priority: number = 0;
  date!: Date;
}

export const FaqSchema = Joi.object({
  _id: Joi.string().allow(""),
  groupId: Joi.number(),
  question: Joi.string().required().regex(rgx_insecure, { invert: true }),
  answer: Joi.string().required().regex(rgx_insecure, { invert: true }),

  display: Joi.boolean(),
  priority: Joi.number(),
  date: Joi.date().timestamp().allow(""),
});

module.exports = {
  FaqEntity,
  FaqSchema,
};

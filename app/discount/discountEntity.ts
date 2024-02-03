import { rgx_date, rgx_insecure } from "../utility/regexValidate";

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export const discountTypes = {
  GENERAL: 1, // for all products
  SPECIFIED: 2, // for specified product
};

export class DiscountEntity {
  _id: string = "";
  sDate!: Date;
  eDate!: Date;
  title: string = "";
  type: number = 0;
  value: number = 0;
  productId: string = "";

  date!: Date;
}

export const DiscountSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  sDate: Joi.string().regex(rgx_date).messages({
    "string.pattern.base": "فرمت نادرست تاریخ",
  }),
  eDate: Joi.string().regex(rgx_date).messages({
    "string.pattern.base": "فرمت نادرست تاریخ",
  }),
  title: Joi.string().regex(rgx_insecure, { invert: true }).messages({
    "string.pattern.invert.base": "کاراکترهای غیر مجاز",
  }),
  type: Joi.number(),
  value: Joi.number(),
  productId: Joi.string().allow(""),
  date: Joi.string().allow(""),
});

module.exports = {
  DiscountEntity,
  DiscountSchema,
  discountTypes,
};

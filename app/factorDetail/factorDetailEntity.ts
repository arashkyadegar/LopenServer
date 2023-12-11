const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export interface IFactorDetail {
  _id: string;
  factorId: number;
  productId: number;
  unitPrice: number;
  discount: number;
  count: number;
  prices: number;
  date:Date;
}

export class FactorDetailEntity {
  _id: string = "";
  factorId: number = 0;
  productId: number = 0;
  unitPrice: number = 0;
  discount: number = 0;
  count: number = 0;
  prices: number = 0;
  date!:Date;

}

export const FactorDetailSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  factorId:Joi.objectId().allow(""),
  productId: Joi.objectId().allow(""),
  unitPrice: Joi.number(),
  discount: Joi.number(),
  count: Joi.number(),
  prices: Joi.number(),
  date: Joi.date().timestamp().allow(""),
});

module.exports = {
  FactorDetailSchema,
  FactorDetailEntity,
};

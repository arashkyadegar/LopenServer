const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export interface IFactor {
  _id: string;
  factorNumber: string;
  webUserID: string;
  refCode: string;
  factorContent: string;
  additionalInfo: string;
  price: number;
  statusID: number;
  paymentType: number;
  date: Date;
}

export class FactorEntity implements IFactor {
  _id: string = "";
  factorNumber: string = "";
  webUserID: string = "";
  refCode: string = "";
  factorContent: string = "";
  additionalInfo: string = "";
  price: number = 0;
  statusID: number = 0;
  paymentType: number = 0;
  date!: Date;
}

export const FactorSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  factorNumber: Joi.string().allow(""),
  webUserID: Joi.string().allow(""),
  refCode: Joi.string().allow(""),
  factorContent: Joi.string().allow(""),
  additionalInfo: Joi.string().allow(""),
  price: Joi.number(),
  statusID: Joi.number(),
  paymentType: Joi.number(),
  date: Joi.string().allow(""),
});

module.exports = {
  FactorEntity,FactorSchema
};

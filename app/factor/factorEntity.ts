const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export interface IFactor {
  _id: string;
  factorNumber: string;
  wbuserId: string;
  refCode: string;
  factorContent: string;
  additionalInfo: string;
  price: number;
  statusId: number;
  paymentType: number;

  firstName: string;
  lastName: string;
  mobile: string;
  tel: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  desc: string;
  date: Date;
}

export class FactorEntity implements IFactor {
  _id: string = "";
  factorNumber: string = "";
  wbuserId: string = "";
  refCode: string = "";
  factorContent: string = "";
  additionalInfo: string = "";
  price: number = 0;
  statusId: number = 0;
  paymentType: number = 0;

  firstName: string = "";
  lastName: string = "";
  mobile: string = "";
  tel: string = "";
  state: string = "";
  city: string = "";
  postalCode: string = "";
  address: string = "";
  desc: string = "";
  date!: Date;
}

export const FactorSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  factorNumber: Joi.string().allow(""),
  wbuserId: Joi.string().allow(""),
  refCode: Joi.string().allow(""),
  factorContent: Joi.string().allow(""),
  additionalInfo: Joi.string().allow(""),
  price: Joi.number(),
  statusId: Joi.number(),
  paymentType: Joi.number(),
  date: Joi.string().allow(""),
});

module.exports = {
  FactorEntity,
  FactorSchema,
};

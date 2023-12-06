
const Joi = require('joi');
export class ILike {
  _id!: string;
  wbuserId!: string;
  productId!: string;
  date!:Date;
}

export class LikeEntity extends ILike {
}

export const LikeEntitySchema = Joi.object({
    _id: Joi.string(),
    wbuserId: Joi.string(),
    productId: Joi.string(),
    date: Joi.date().timestamp().allow(''),
  });

module.exports={
  LikeEntity,
  LikeEntitySchema
}
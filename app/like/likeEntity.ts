
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
    _id: Joi.string().allow(''),
    wbuserId: Joi.objectId().allow(""),
    productId: Joi.objectId().allow(""),
    date: Joi.date().timestamp().allow(''),
  });

module.exports={
  LikeEntity,
  LikeEntitySchema
}
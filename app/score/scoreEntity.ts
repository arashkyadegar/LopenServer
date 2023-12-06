const Joi = require("joi");
export class IScore {
  _id!: string;
  wbuserId!: string;
  productId!: string;
  value!: number;
  date!: Date;
}

export class ScoreEntity extends IScore {}

export const ScoreEntitySchema = Joi.object({
  _id: Joi.string(),
  wbuserId: Joi.string(),
  productId: Joi.string(),
  value: Joi.number(),
  date: Joi.date().timestamp().allow(""),
});

module.exports = {
  ScoreEntitySchema,
  ScoreEntity,
};

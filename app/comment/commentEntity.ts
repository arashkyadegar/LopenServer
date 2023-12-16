var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class CommentEntity {
  _id: string = "";
  wbuserId: string = "";
  productId: string = "";
  text: string = "";
  isVisible: boolean = false;
  date!: string;
}

export const CommentSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  wbuserId: Joi.objectId(),
  productId: Joi.objectId(),
  text: Joi.string(),
  isVisible: Joi.boolean(),
  date: Joi.string().allow(""),
});


module.exports = {
  CommentEntity,
  CommentSchema,
};

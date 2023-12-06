const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class ProductEntity {
  _id: string = "";
  name: string = "";
  weight: string = "";
  size: string = "";
  HealthId: string = "";
  type: string = "";
  components: string = "";
  desc: string = "";
  score: number = 0;
  price: number = 0;
  display: boolean = true;
  isAvailable: boolean = true;
  tags: string[] = [];
  image: string = "";
  images: string[] = [];
  userId: string = "";
  date!: Date;
}
export class ProductWbEntity extends ProductEntity {
  liked: boolean = false;
  scores: any[] = [];
  likes: any[] = [];
}
export const ProductSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  name: Joi.string(),
  weight: Joi.string(),
  size: Joi.string(),
  HealthId: Joi.string(),
  type: Joi.string(),
  components: Joi.string().allow(""),
  desc: Joi.string().allow(""),
  score: Joi.number(),
  price: Joi.number(),
  display: Joi.boolean(),
  isAvailable: Joi.boolean(),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  userId: Joi.string(),
  date: Joi.string().allow(""),
});

module.exports = {
  ProductEntity,
  ProductSchema,
  ProductWbEntity
};

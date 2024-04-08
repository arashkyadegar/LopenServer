import { rgx_frNo } from "../utility/regexValidate";

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class ProductEntity {
  _id: string = "";
  name: string = "";
  weight: string = "";
  size: string = "";
  healthId: string = "";
  type: string = "1";
  components: string = "";
  desc: string = "";
  score: number = 0;
  price: number = 0;
  display: boolean = true;
  isAvailable: boolean = true;
  tags: string[] = [];
  image: string = "";
  images: string[] = [];
  files: string[] = [];
  userId: string = "";
  date!: Date;
}
export class ProductWbEntity extends ProductEntity {
  liked: boolean = false;
  scores: any[] = [];
  likes: any[] = [];
  discounts: any[] = [];
}
export const ProductSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  name: Joi.string(),
  weight: Joi.string().required(),
  size: Joi.string(),
  healthId: Joi.string(),
  type: Joi.string(),
  components: Joi.string(),
  desc: Joi.string(),
  score: Joi.number().required(),

  price: Joi.string().required(),
  display: Joi.boolean(),
  isAvailable: Joi.boolean(),
  image: Joi.string().allow(""),
  images: Joi.array().items(Joi.string()).min(3),
  tags: Joi.array().items(Joi.string()).min(1),
  files: Joi.array(),
  userId: Joi.string().allow(""),
  date: Joi.string().allow(""),
});

module.exports = {
  ProductEntity,
  ProductSchema,
  ProductWbEntity,
};

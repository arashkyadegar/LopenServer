const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);


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
  isShow: boolean = true;
  image: string = "";
}

export const ProductSchema = Joi.object({
     _id: Joi.objectId().allow(''),
     name: Joi.string(),
     weight: Joi.string(),
     size: Joi.string(),
     HealthId: Joi.string(),
     type: Joi.string(),
     components: Joi.string(),
     desc: Joi.string(),
     score: Joi.number(),
     price: Joi.number(),
     display: Joi.boolean(),
     isAvailable: Joi.boolean(),
     isShow: Joi.boolean(),
     image: Joi.string(),
     tags: Joi.array().items(Joi.string())
   });


   module.exports = {
     ProductEntity,
     ProductSchema
   };
   
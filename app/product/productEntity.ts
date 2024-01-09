import { DiscountEntity } from "../discount/discountEntity";

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
  name: Joi.string().messages({
    "string.empty": "نام محصول الزامی میباشد",
  }),
  weight: Joi.number().messages({
    "number.base": "وزن محصول باید عدد صحیح باشد",
  }),
  size: Joi.string().messages({
    "string.empty": "سایز محصول الزامی میباشد",
  }),
  healthId: Joi.string().messages({
    "string.empty": "شناسه سلامت محصول الزامی میباشد",
  }),
  type: Joi.string().messages({
    "string.empty": "نوع محصول الزامی میباشد",
  }),
  components: Joi.string().messages({
    "string.empty": "ترکیبات  محصول الزامی میباشد",
  }),
  desc: Joi.string().messages({
    "string.empty": "توضیحات  محصول الزامی میباشد",
  }),
  score: Joi.number().messages({
    "number.base": "امتیاز محصول باید عدد صحیح باشد",
  }),

  price: Joi.number().required(),
  display: Joi.boolean(),
  isAvailable: Joi.boolean(),
  image: Joi.string().allow(""),
  images: Joi.array().items(Joi.string()).min(3).messages({
    "array.base": "  حداقل ۳ تصویر باید وارد کنید",
  }),
  tags: Joi.array().items(Joi.string()).min(1).messages({
    "array.base": "  حداقل ۱ برچسب  باید وارد کنید",
    "string.empty": "برچسب  محصول الزامی میباشد",
  }),
  files:Joi.array(),
  userId: Joi.string().allow(""),
  date: Joi.string().allow(""),
});

module.exports = {
  ProductEntity,
  ProductSchema,
  ProductWbEntity,
};

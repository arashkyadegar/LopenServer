const Joi = require("joi");
export class SiteInfoEntity {
  _id: string = "1";
  address1: string = "";
  address2: string = "";
  tel1: string = "";
  tel2: string = "";

  mobile1: string = "";
  mobile2: string = "";

  email1: string = "";
  email2: string = "";

  twitter: string = "";
  googlePlus: string = "";
  instagram: string = "";
  linkedin: string = "";
  whatsapp: string = "";
  skype: string = "";

  headerImages: string[] = [];

  logo1: string = "";
  logo2: string = "";

  footerImage1: string = "";
  footerImage2: string = "";
  headerTitle: string = "";
  footerDescription: string = "";
  copyRightText: string = "";
  copyRightYear: string = "";
  languageId: string = "";
}

export const SiteInfoSchema = Joi.object({
  _id: Joi.string(),
  address1: Joi.string().allow(""),
  address2: Joi.string().allow(""),
  tel1: Joi.number().allow(""),
  tel2: Joi.number().allow(""),

  mobile1: Joi.number().allow(""),
  mobile2: Joi.number().allow(""),

  email1: Joi.string().email().allow(""),
  email2: Joi.string().email().allow(""),

  twitter: Joi.string().allow(""),
  googlePlus: Joi.string().allow(""),
  instagram: Joi.string().allow(""),
  linkedin: Joi.string().allow(""),
  whatsapp: Joi.string().allow(""),
  skype: Joi.string().allow(""),

  headerImages: Joi.array().items(Joi.string()).min(3),

  logo1: Joi.string().allow(""),
  logo2: Joi.string().allow(""),

  footerImage1: Joi.string().allow(""),
  footerImage2: Joi.string().allow(""),
  headerTitle: Joi.string().allow(""),
  footerDescription: Joi.string().allow(""),
  copyRightText: Joi.string().allow(""),
  copyRightYear: Joi.string().allow(""),
  languageId: Joi.string().allow(""),
});
module.exports = {
  SiteInfoEntity,
  SiteInfoSchema
};

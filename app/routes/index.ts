var express = require("express");
const router = express.Router();
const ProductRouter = require("../product/product");
const ProductWbRouter = require("../productWeb/productWb");
const SiteInfoRouter = require("../siteInfo/siteInfo");
const LikeWbRouter = require("../likeWeb/likeWb");
const ScoreWbRouter = require("../scoreWeb/scoreWb");
const FaqRouter = require("../faq/faq");
const FaqWbRouter = require("../faqWeb/faqWb");
module.exports = function (app) {
  app.use("/products", ProductRouter);
  app.use("/wbproducts", ProductWbRouter);
  app.use("/siteinfos", SiteInfoRouter);
  app.use("/wblikes", LikeWbRouter);
  app.use("/wbscores", ScoreWbRouter);
  app.use("/faqs", FaqRouter);
  app.use("/wbfaqs", FaqWbRouter);
};

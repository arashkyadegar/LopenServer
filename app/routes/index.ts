var express = require("express");
const router = express.Router();
const ProductRouter = require("../product/product");
const ProductWbRouter = require("../productWeb/productWb");
const SiteInfoRouter = require("../siteInfo/siteInfo");

module.exports = function (app) {
  app.use("/products", ProductRouter);
  app.use("/wbproducts", ProductWbRouter);
  app.use("/siteinfos", SiteInfoRouter);
};

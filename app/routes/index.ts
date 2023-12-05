var express = require("express");
const router = express.Router();
const ProductRouter = require("../product/product");

module.exports = function (app) {
  app.use("/products", ProductRouter);
};

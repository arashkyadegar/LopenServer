var express = require("express");

const ProductRouter = require("../product/product");
const ProductWbRouter = require("../productWeb/productWb");
const SiteInfoRouter = require("../siteInfo/siteInfo");
const SiteInfoWbRouter = require("../siteInfoWeb/siteInfoWb");
const LikeWbRouter = require("../likeWeb/likeWb");
const ScoreWbRouter = require("../scoreWeb/scoreWb");
const FaqRouter = require("../faq/faq");
const FaqWbRouter = require("../faqWeb/faqWb");
const FactorRouter = require("../factor/factor");
const FactorDetailRouter = require("../factorDetail/factorDetail");
const DiscountRouter = require("../discount/discount");
const CommentRouter = require("../comment/comment");
const CommentWbRouter = require("../commentWeb/commentWb");
const ProductContorllerRouter = require("../controllers/productController");
const DiscountContorllerRouter = require("../controllers/discountController");
const UploadRouter = require("../upload/upload");
const AuthRouter = require("../auth/auth");

module.exports = function (app) {
  app.use("/api/products", ProductRouter);
  app.use("/api/wbproducts", ProductWbRouter);
  app.use("/api/siteinfos", SiteInfoRouter);
  app.use("/api/wbsiteinfos", SiteInfoWbRouter);
  app.use("/api/wblikes", LikeWbRouter);
  app.use("/api/wbscores", ScoreWbRouter);
  app.use("/api/faqs", FaqRouter);
  app.use("/api/wbfaqs", FaqWbRouter);
  app.use("/api/factors", FactorRouter);
  app.use("/api/factordetails", FactorDetailRouter);
  app.use("/api/discounts", DiscountRouter);
  app.use("/api/comments", CommentRouter);
  app.use("/api/wbcomments", CommentWbRouter);
  app.use("/api/uploads", UploadRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/products", ProductContorllerRouter);
  app.use("/discounts", DiscountContorllerRouter);
};

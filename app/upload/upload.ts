import express from "express";
import { ResponseStatus } from "../utility/errorStatus";
import validator from "validator";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file);
    cb(null, Date.now() + file.originalname + ".png");
  },
});
const upload = multer({ storage: storage });
export const UploadRouter = express.Router();

UploadRouter.post("/", upload.array("files"), function (req: any, res) {
  const result: any = [];

  req.files.forEach((file: any) => {
    result.push(file.filename);
  });
  //const fileName = validator.escape(req.file.filename);
  res.status(ResponseStatus.OK).send({
    files: result,
  });
});

module.exports = UploadRouter;

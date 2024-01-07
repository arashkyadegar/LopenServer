// Arashk yadegar
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
import "dotenv/config";
const bodyParser = require("body-parser");

var express = require("express");
var app = express();
var cors = require("cors");
const path = require("path");
const fss = require("fs");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE",
};

import jwt from "jsonwebtoken";
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
import { Base64 } from "./app/utility/base64";
var http = require("http").Server(app);

const LIARA_URL = process.env.LIARA_URL || "localhost";
app.use(express.static(__dirname + "./public"));

app.use(express.static(path.resolve("./public")));
require("./app/routes/index")(app);

// app.post("/test", async function (req: any, res: any) {
//   const coder = new Base64();
//   const token = jwt.sign(
//     { user_id: "user[0]._id", email: "arashk@gmail.com" },
//     "abc", ///temprory TOKEN_KEY
//     {
//       expiresIn: "2h",
//     }
//   );
//   const encodedToken = coder.encode(token);
//   const decodedToken = coder.decode(encodedToken);
//   const rslt = jwt.verify(decodedToken, process.env.SECRET_KEY || "abc");
//   res.send(rslt);
// });

// app.post("/auth/login1/", upload.single("file"), function (req: any, res: any) {
//   console.log(req.body);
//   console.log(req.file);
//   res.send("hello world");
// });

app.listen(process.env.PORT, () =>
  console.log(`app listening on ${process.env.PORT}`)
);
module.exports = app;

// Arashk yadegar
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
import "dotenv/config";
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var app = express();
var cors = require("cors");
const path = require("path");
const fss = require("fs");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE",
  preflightContinue: true,
  credentials: true,
};

import jwt from "jsonwebtoken";
import { checkAuthorize } from "./app/middleware/authorize";
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));

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

// app.post("/api/auth/login1/", function (req: any, res: any) {
//   res.clearCookie("cookieName");
//   res.cookie("cookieName", "arashk yadegar", {
//     maxAge: 900000,
//     httpOnly: false,
//     secure: true,
//   });
//   res.send("hello world");
// });

// app.get("/api/auth/login1/",checkAuthorize, function (req: any, res: any) {

//   res.send({ message: "goodbye" });
// });

app.listen(process.env.PORT, () =>
  console.log(`app listening on ${process.env.PORT}`)
);
module.exports = app;

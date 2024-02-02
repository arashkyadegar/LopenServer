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
const fs = require("fs");
var options = {
  key: fs.readFileSync("id_rsa"),
  cert: fs.readFileSync("id_rsa.pub"),
};

var corsOptions = {
 // origin: "https://nextjs-lopencandy.iran.liara.run",
 origin:"http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE",
  //preflightContinue: true,
  credentials: true,
};

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

app.listen(process.env.PORT, () =>
  console.log(`app listening on ${process.env.PORT}`)
);

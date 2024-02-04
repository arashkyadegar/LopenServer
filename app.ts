// Arashk yadegar
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
import "dotenv/config";
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var app = express();
app.use(helmet());
app.use(limiter);
var cors = require("cors");
const path = require("path");
const fs = require("fs");
var options = {
  key: fs.readFileSync("id_rsa"),
  cert: fs.readFileSync("id_rsa.pub"),
};

var corsOptions = {
   origin: "https://nextjs-lopencandy.iran.liara.run",
  //origin: "http://localhost:3000",
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

import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
export const checkAuthorize = async function (req, res, next) {
  try {
    var cookie = require("cookie");
    const coder = new Base64();
    var cookie = require("cookie");
    console.log("middleware:");
    const x = JSON.parse(req.headers.authorization);
    const decodedToken = await coder.decode(x.token);
    const rslt = jwt.verify(decodedToken, process.env.SECRET_KEY || "abc");
    console.log(rslt);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(ResponseStatus.UNAUTHORIZED).send(err);
  }
};

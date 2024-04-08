import { Base64 } from "../utility/base64";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "../utility/errorStatus";
export const checkAuthorize2 = async function (req, res, next) {
  try {
    const coder = new Base64();
    // console.log('Cookies: ', req.cookies)
    const x = JSON.parse(req.cookies.alonefighterx).token;
    console.log(x);
    const decodedToken = await coder.decode(x);
    const rslt = jwt.verify(decodedToken, process.env.SECRET_KEY || "abc");
    return next();
  } catch (err) {
    console.log(err);
    return res.status(ResponseStatus.UNAUTHORIZED).send(err);
  }
};

export const checkAuthorize = async function (req, res, next) {
  try {
    const coder = new Base64();
    let token = "";

    if (req.headers.authorization != undefined) {
      token = JSON.parse(req.headers.authorization).token;
    } else if (req.cookies.alonefighterx != undefined) {
      token = JSON.parse(req.cookies.alonefighterx).token;
    }
    const decodedToken = await coder.decode(token);
    const rslt = jwt.verify(decodedToken, process.env.SECRET_KEY || "abc");
    
    return next();
  } catch (err) {
    //console.log(err);
    return res.status(ResponseStatus.UNAUTHORIZED).send(err);
  }
};

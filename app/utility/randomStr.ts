var _ = require("lodash");
export const getRandomString = () => {
  let a = new Uint8Array(3);
  let nu = crypto.getRandomValues(a);
  return _.replace(nu.toString(), /,/g, "");
};

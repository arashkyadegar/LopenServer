import { DiscountEntity } from "./discountEntity";

export const checkIfDiscountIsAllowed = (discount: any): DiscountEntity[] => {
  let today = new Date();
  const sd = discount.sDate.toISOString().substring(0, 10);
  const ed = discount.eDate.toISOString().substring(0, 10);
  const td = today.toISOString().substring(0, 10);

  console.log(td);
  console.log(sd);
  console.log(ed);

  if (td >= sd && td <= ed) {
    return discount;
  } else {
    return [];
  }
};
export const converEnDateToFaDate = (date: string) => {
  var moment = require("jalali-moment");
  return moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
};
export const converFaDateToEnDate = (date: Date) => {
  var moment = require("jalali-moment");
  let x = moment.from(date, "fa", "YYYY/M/D");
  return new Date(x);
};

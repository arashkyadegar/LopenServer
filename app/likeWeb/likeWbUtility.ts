import { ProductWbEntity } from "../product/productEntity";

export const checkLikesByUser = function (
  wbuserId: string,
  entity: ProductWbEntity
): boolean {
  let result = false;
  entity.likes.forEach((element) => {
    if (element.wbuserId == wbuserId) {
      result = true;
    }
  });
  return result;
};

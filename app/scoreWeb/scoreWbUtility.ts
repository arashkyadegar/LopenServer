import { ProductWbEntity } from "../product/productEntity";

export const calculateScore = function (entity: ProductWbEntity): number {
  const scoreCount = entity.scores.length;
  let totalScore = 0;

  entity.scores.forEach((element) => {
    totalScore = totalScore + element.value;
  });

  return totalScore / scoreCount;
};

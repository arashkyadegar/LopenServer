const Joi = require("joi");
export class IUser {
  _id!: string;
  name!: string;
}

export class UserEntity extends IUser {}
export class UserWbEntity extends IUser {}
export const UserEntitySchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
});

module.exports = {
  UserEntitySchema,
  UserEntity,
  UserWbEntity,
};

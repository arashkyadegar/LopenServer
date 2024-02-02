const Joi = require("joi");
export class IUser {
  _id!: string;
  username!: string;
  password!: string;
}

export class UserEntity extends IUser {}
export class UserWbEntity extends IUser {}

export const UserSchema = Joi.object({
  _id: Joi.string().allow(""),
  username: Joi.string().min(5).max(10),
  password: Joi.string().min(10),
});

module.exports = {
  UserSchema,
  UserEntity,
  UserWbEntity,
};

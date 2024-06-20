import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

// Define the user type
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface LoginUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;

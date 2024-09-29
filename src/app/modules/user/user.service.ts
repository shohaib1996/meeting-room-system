import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/tokenCreation";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";

const createUserIntoDB = async (userData: TUser) => {
  const newUser = await User.create(userData);
  const result = await User.findById(newUser._id).select("-password");
  return result;
};
const loginUserIntoDB = async (loginData: TLoginUser) => {
  const user = await User.isUserExistsByEmail(loginData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  const passwordMatched = await User.isPasswordMatched(
    loginData?.password,
    user?.password
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
    name: user.name,     
    address: user.address,
    phone: user.phone, 
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const result = await User.findOne({ email: user.email }).select("-password");

  return {
    accessToken,
    result,
  };
};
// const getAllUsersFromDB = async () => {
//   const users = await User.find().select("-password");  // Exclude password from the result
//   return users;
// };
const getSingleUserByEmailFromDB = async (email: string) => {
  const user = await User.findOne({ email }).select("-password"); // Find user by email and exclude the password
  return user;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  // getAllUsersFromDB,
  getSingleUserByEmailFromDB, 
};

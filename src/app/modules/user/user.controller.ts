import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await UserServices.loginUserIntoDB(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.result,
  });
});
// const getAllUsers = catchAsync(async (req, res) => {
//   const users = await UserServices.getAllUsersFromDB();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Users retrieved successfully",
//     data: users,
//   });
// });
const getSingleUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Email query parameter must be a valid string",
      data: {}
    });
  }

  const user = await UserServices.getSingleUserByEmailFromDB(email);

  if (!user) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: {}
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  // getAllUsers,
  getSingleUserByEmail,
};

import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import jwt from "jsonwebtoken";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(
        new AppError(httpStatus.NOT_FOUND, "This user is not found!")
      );
    }

    // Attach decoded user info to the request object
    req.user = decoded as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          "You have no access to this route"
        )
      );
    }

    next();
  });
};

export default auth;

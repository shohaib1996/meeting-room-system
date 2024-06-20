/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodErrors";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  const errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof AppError) {
    // Handle known application errors
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  } else if (err instanceof ZodError) {
    // Handle Zod validation errors
    const simplifiedError = handleZodError(err);
    return res.status(simplifiedError.statusCode).json({
      success: false,
      message: simplifiedError.message,
      errorMessages: simplifiedError.errorSources,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  } else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    return res.status(simplifiedError.statusCode).json({
      success: false,
      message: simplifiedError.message,
      errorMessages: simplifiedError.errorSources,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    return res.status(simplifiedError.statusCode).json({
      success: false,
      message: simplifiedError.message,
      errorMessages: simplifiedError.errorSources,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    return res.status(simplifiedError.statusCode).json({
      success: false,
      message: simplifiedError.message,
      errorMessages: simplifiedError.errorSources,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

export default globalErrorHandler;

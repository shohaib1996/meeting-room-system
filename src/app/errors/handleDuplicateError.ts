/* eslint-disable @typescript-eslint/no-explicit-any */
// handleDuplicateError.ts
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const fieldName = Object.keys(err.keyValue)[0];
  const value = err.keyValue[fieldName];

  const errorSources: TErrorSource = [
    {
      path: fieldName,
      message: `Duplicate field value: ${value}. Please use another value!`,
    },
  ];

  return {
    statusCode: 409,
    message: "Duplicate Key Error",
    errorSources,
  };
};

export default handleDuplicateError;

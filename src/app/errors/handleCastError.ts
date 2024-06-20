// handleCastError.ts
import { CastError } from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: CastError): TGenericErrorResponse => {
  const message = `Invalid ${err.kind} for the path '${err.path}' with value '${err.value}'`;

  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: message,
    },
  ];

  return {
    statusCode: 400,
    message: "Cast Error",
    errorSources,
  };
};

export default handleCastError;

import type { AxiosError } from "axios";

export type ErrorResponse = {
  statusMessage: string;
  description: string;
  statusCode: number;
};

export type CustomError = {
  code: number;
  message: string;
  status: number;
  op_code?: number;
};

export type ExposedErrorType = AxiosError<ErrorResponse>;


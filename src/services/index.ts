/** @format */
import type {
  IMetalPreBuyPricePayload,
  IMetalPreBuyPriceDataService,
} from "@ts/services/price";
import type { ISingPayload } from "@ts/services/payment";
import { OP_CODES } from "@constants";
import { axiosInstance } from "./axios";

export const apis = {
  sign(payload: ISingPayload) {
    return axiosInstance.post(import.meta.env.VITE_SIGN_API_PATH, payload);
  },

  preBuy(payload: IMetalPreBuyPricePayload) {
    return axiosInstance.post<IResponse<IMetalPreBuyPriceDataService>>(
      import.meta.env.VITE_GRPC_API_PATH,
      {
        op_code: OP_CODES.preBuyMetal,
        payload: JSON.stringify(payload),
      },
    );
  },
};

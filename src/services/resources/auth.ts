import { axiosInstance } from '@services/axios'
import { API_RESOURCES, OP_CODES } from '@constants'
import type {
  ILoginPayload,
  ILoginRes,
  IVerifyPayload,
  IVerifyRes
} from '@ts/services/Auth'

export default {
  login(payload: ILoginPayload) {
    return axiosInstance.post<IResponse<ILoginRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.LOGIN,
      payload: JSON.stringify(payload)
    })
  },

  profile() {
    return axiosInstance.post<IResponse>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.PROFILE,
      payload: JSON.stringify({})
    })
  },

  verify(payload: IVerifyPayload) {
    return axiosInstance.post<IResponse<IVerifyRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.VERIFY,
      payload: JSON.stringify(payload)
    })
  }
}

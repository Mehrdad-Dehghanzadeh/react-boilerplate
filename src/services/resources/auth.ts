import { axiosInstance } from '@services/axios'
import { API_RESOURCES, OP_CODES } from '@constants'
import type {
  ILoginPayload,
  ILoginRes,
  IProfileRes,
  IVerifyPayload,
  IVerifyRes,
  IRefreshPayload,
  IGetUserRes
} from '@ts/services/Auth'

export default {
  login(payload: ILoginPayload) {
    return axiosInstance.post<IResponse<ILoginRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.LOGIN,
      payload: JSON.stringify(payload)
    })
  },

  profile() {
    return axiosInstance.post<IResponse<IProfileRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.PROFILE,
      payload: JSON.stringify({})
    })
  },

  verify(payload: IVerifyPayload) {
    return axiosInstance.post<IResponse<IVerifyRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.VERIFY,
      payload: JSON.stringify(payload)
    })
  },

  logout() {
    return axiosInstance.post<IResponse>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.LOGOUT,
      payload: JSON.stringify({})
    })
  },

  refresh(payload: IRefreshPayload) {
    return axiosInstance.post<IResponse<IVerifyRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.REFRESH,
      payload: JSON.stringify(payload)
    })
  },

  getUser() {
    return axiosInstance.post<IResponse<IGetUserRes>>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.GET_USER,
      payload: JSON.stringify({})
    })
  },

  removeUser(id: number) {
    return axiosInstance.post<IResponse>(API_RESOURCES.AUTH, {
      op_code: OP_CODES.DELETE_USER,
      payload: JSON.stringify({ user_account_id : id})
    })
  }
}

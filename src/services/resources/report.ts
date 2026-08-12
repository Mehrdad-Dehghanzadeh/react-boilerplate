import { axiosInstance } from '@services/axios'
import { API_RESOURCES, OP_CODES } from '@constants'
import type {
  IHomePayload,
  IDashboardPayload,
  IHomeRes,
  ICustomerInfoPayload,
  ICustomerInfoRes
} from '@ts/services/Report'

export default {
  home(payload?: IHomePayload) {
    return axiosInstance.post<IResponse<IHomeRes>>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.HOME,
      payload: JSON.stringify(payload)
    })
  },

  dashboard(payload: IDashboardPayload) {
    return axiosInstance.post<IResponse>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.DASHBOARD,
      payload: JSON.stringify(payload)
    })
  },

  customerInfo(payload: ICustomerInfoPayload) {
    return axiosInstance.post<IResponse<ICustomerInfoRes>>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.CUSTOMER_INFO,
      payload: JSON.stringify(payload)
    })
  }
}

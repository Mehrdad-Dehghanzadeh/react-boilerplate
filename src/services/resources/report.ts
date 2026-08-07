import { axiosInstance } from '@services/axios'
import { API_RESOURCES, OP_CODES } from '@constants'
import type { IDashboardPayload, IReportRes } from '@ts/services/Report'

export default {
  home() {
    return axiosInstance.post<IResponse<IReportRes>>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.HOME,
      payload: JSON.stringify({})
    })
  },

  dashboard(payload: IDashboardPayload) {
    return axiosInstance.post<IResponse>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.DASHBOARD,
      payload: JSON.stringify(payload)
    })
  }
}

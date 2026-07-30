import { axiosInstance } from '@services/axios'
import { API_RESOURCES, OP_CODES } from '@constants'
import type { IReportPayload, IReportRes } from '@ts/services/Report'

export default {
  home(payload: IReportPayload) {
    return axiosInstance.post<IResponse<IReportRes>>(API_RESOURCES.REPORT, {
      op_code: OP_CODES.HOME,
      payload: JSON.stringify(payload)
    })
  }
}

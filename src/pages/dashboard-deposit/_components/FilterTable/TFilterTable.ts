import type { TRefundStatus, TRefund } from '@ts/Merchant'
import type { IRefundPayload } from '@ts/services/Report'

export type TForm = {
  duration_create: number
  provider_branch_id: number
  status: TRefundStatus | ''
  mobile: string
  amount: string
  create_time: string
}

export type TFiltersProps = {
  getData: (payload?: IRefundPayload) => void
  data: TRefund[]
}

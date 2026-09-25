import type { TRefundStatus, TSettlementItem } from '@ts/Merchant'
import type { ISettlementPayload } from '@ts/services/Report'

export type TForm = {
  duration_create: number
  provider_branch_id: number
  status: TRefundStatus | ''
  mobile: string
  create_time: string
  pay_time: string
}

export type TFiltersProps = {
  getData: (payload?: ISettlementPayload) => void
  data: TSettlementItem[]
}

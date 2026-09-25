import type { TSettlementItemStatus, TSettlementItem } from '@ts/Merchant'
import type { ISettlementItemPayload } from '@ts/services/Report'

export type TForm = {
  duration_create: number
  provider_branch_id: number
  status: TSettlementItemStatus | ''
  mobile: string
  create_time: string
  pay_time: string
}

export type TFiltersProps = {
  getData: (payload?: ISettlementItemPayload) => void
  data: TSettlementItem[]
}

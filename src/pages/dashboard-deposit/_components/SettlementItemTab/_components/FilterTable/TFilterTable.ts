import type { TSettlementItemStatus, TSettlementItem } from '@ts/Merchant'
import type { ISettlementItemPayload } from '@ts/services/Report'

export type TForm = {
  provider_branch_id: number
  status: TSettlementItemStatus | ''
  mobile: string
  create_time: string
  gross_amount: string
  net_amount: string
  track_number: string
}

export type TFiltersProps = {
  getData: (payload?: ISettlementItemPayload) => void
  data: TSettlementItem[]
}

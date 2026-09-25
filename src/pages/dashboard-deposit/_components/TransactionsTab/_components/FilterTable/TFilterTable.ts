import type { TSettlementStatus, TSettlement } from '@ts/Merchant'
import type { ISettlementPayload } from '@ts/services/Report'

export type TForm = {
  duration_create: number
  provider_branch_id: number
  iban: string
  count: string
  net_amount: string
  gross_amount: string
  bank_reference: string
  pay_time: string
}

export type TFiltersProps = {
  getData: (payload?: ISettlementPayload) => void
  data: TSettlement[]
}

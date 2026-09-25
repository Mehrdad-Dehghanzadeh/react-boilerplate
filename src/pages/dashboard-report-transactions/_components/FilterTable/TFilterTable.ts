import type { TTicketStatus, TCreditTickets } from '@ts/Merchant'
import type { IHomePayload } from '@ts/services/Report'

export type TForm = {
  provider_branch_id: number
  status: TTicketStatus | ''
  mobile: string
  track_number: string
  amount: 0
  pay_time: string
  create_time: string
  channel: 'online' | 'offline' | EmptyString
}

export type TFiltersProps = {
  getData: (payload: IHomePayload) => void
  data: TCreditTickets[]
}

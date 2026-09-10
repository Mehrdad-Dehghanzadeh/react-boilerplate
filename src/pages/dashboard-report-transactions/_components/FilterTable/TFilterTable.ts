import type { TTicketStatus, TCreditTickets } from '@ts/Merchant';
import type { IHomePayload } from '@ts/services/Report'

export type TForm = {
  provider_branch_id: number
  status: TTicketStatus | ''
  mobile: string
  track_number: string
  amount: 0
}

export type TFiltersProps = {
  getData: (payload: IHomePayload) => void
  data: TCreditTickets[]
}

import type { TTicketStatus, TCreditTickets } from '@ts/Merchant';
import type { IHomePayload } from '@ts/services/Report'

export type TForm = {
  duration_create: number
  provider_branch_id: number
  status: TTicketStatus | ''
  mobile: string
  track_number: string
}

export type TFiltersProps = {
  getData: (payload: IHomePayload) => void
  data: TCreditTickets[]
}

import type { TRoles } from '@ts/Common'
import type { TMerchantStore, TCreditTickets } from '@ts/Merchant'
export interface IReportPayload {
  mobile: string
  branch_id: number
  role: TRoles
}

export interface IDashboardPayload {
  duration_create: number
  provider_branch_id?: number
  online?: boolean
  offline?: boolean
}

export interface IDashboardRes {
  merchant_store: TMerchantStore
}

export interface IHomePayload {
  last_id?: number
}

export interface IHomeRes {
  merchant_store: TMerchantStore & { credit_tickets: TCreditTickets[] }
}

export interface ICustomerInfoPayload {
  customer_id: number
}

export interface ICustomerInfoRes {
  duration_create: number
  provider_branch_id: number
}

const merchant_store = {
  id: 1,
  status: '1',
  manager_name: 'حمید',
  manager_family: 'قدمی',
  manager_email: 'info@technolife.com',
  manager_mobile: '09134059548',
  merchant_type: '1',
  created_at: '2025-12-02T16:36:04Z',
  branches: [
    {
      id: 1,
      store_name: 'تکنولایف',
      manager_name: 'حمید',
      manager_family: 'قدمی',
      manager_mobile: '09120202320',
      type: '1',
      status: '1',
      created_at: '2025-12-02T16:36:17Z',
      transactions: {
        merchant_payable_amount: 16965035982,
        remaining_amount: 0,
        sum_amount: 141426444952
      },
      transactions_refunded: {
        merchant_payable_amount: 0,
        remaining_amount: 0,
        sum_amount: 0
      },
      transactions_settled: null,
      transaction_online: {
        merchant_payable_amount: 16965035982,
        remaining_amount: 0,
        sum_amount: 141426444952
      },
      transaction_offline: {
        merchant_payable_amount: 0,
        remaining_amount: 0,
        sum_amount: 0
      }
    },
    {
      id: 10,
      store_name: 'تکنولایف اپال',
      manager_name: 'حمید',
      manager_family: 'قدمی',
      manager_mobile: '09120202320',
      type: '2',
      status: '1',
      created_at: '2025-12-02T16:36:32Z',
      transactions: {
        merchant_payable_amount: 720000000,
        remaining_amount: 0,
        sum_amount: 2032400000
      },
      transactions_refunded: {
        merchant_payable_amount: 0,
        remaining_amount: 0,
        sum_amount: 0
      },
      transactions_settled: null,
      transaction_online: null,
      transaction_offline: null
    },
    {
      id: 11,
      store_name: 'تکنولایف بازار موبایل',
      manager_name: 'حمید',
      manager_family: 'قدمی',
      manager_mobile: '09120202320',
      type: '2',
      status: '1',
      created_at: '2025-12-02T16:36:32Z',
      transactions: {
        merchant_payable_amount: 0,
        remaining_amount: 0,
        sum_amount: 4348140000
      },
      transactions_refunded: {
        merchant_payable_amount: 0,
        remaining_amount: 0,
        sum_amount: 0
      },
      transactions_settled: null,
      transaction_online: null,
      transaction_offline: null
    }
  ]
}

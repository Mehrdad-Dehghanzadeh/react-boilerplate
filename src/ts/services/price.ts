import type { TMetals } from '@ts/Metal'

export interface IGetMetalPricePayload {
  metal_name: string[]
  enable_chart?: boolean
}

export interface IGetMetalPriceDataService {
  has_chart: boolean
  chart: {
    data: Record<TChartPeriod, TChartDataList>
  }

  data: {
    data: {
      metals: TMetals
    }
  }
}

export interface IMetalPreBuyPricePayload {
  metal_name: string
  price: number
  volume: number
}

export interface IMetalPreBuyPriceDataService {
  fee_amount: number
  fee_percentage: number
  payment_amount: number
  price: number
  total_amount: number
  volume: number
  wallet_amount: number
}

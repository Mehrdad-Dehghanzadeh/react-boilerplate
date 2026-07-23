export interface ISingPayload<T = any> {
  op_code: number
  amount: number | string
  payload: T
}

export interface ISellOrBuyDataServices {
  status: 'ok'
}

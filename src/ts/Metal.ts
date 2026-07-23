export type TMetal = {
  global: {
    time: number
    value: number
  }

  internal: {
    time: number
    value: number
    unit: string
    old_price: number
  }

  name: string
}

export type TMetals = TMetal[]

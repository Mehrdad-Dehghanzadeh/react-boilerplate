import num2persian from 'num2persian'

export function runProductionMode(cb: () => any) {
  if (import.meta.env.MODE == 'production') {
    cb()
  }
}

export function isProduction(): boolean {
  return import.meta.env.MODE === 'production'
}

export function randomNumber(pow: number = 5): number {
  return Math.floor(Math.random() * (10 ^ pow))
}

export function getBoolean(value: any): boolean {
  let val: boolean = Boolean(value)

  if (typeof value === 'string') {
    const str = value.toLowerCase()

    switch (str) {
      case 'false':
        val = false
        break

      case 'true':
        val = true
        break
    }
  }

  return val
}

export function roundDown(value: number): number {
  return Math.floor(value * 1000) / 1000
}

export function getPercentage(num1: string | number, num2: string | number): number {
  const t = (Number(num1) - Number(num2)) / Number(num2)
  return Math.floor(t * 1000) / 1000
}

export function pricePersianNumber(value: string | number): string {
  const toman = Number(value) / 10
  return toman && Number(value) / 1000 >= 1
    ? `${num2persian(Math.floor(toman))} تومان`
    : ''
}

export function isAuthentication(): boolean {
  return true
 }

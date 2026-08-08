import { $t } from '@locales'
import jalaali from 'jalaali-js'

export function price(
  val: number | string | null,
  currency: string = $t('common.moneyUnit'),
  initialValue: number | string = 0
) {
  let value: number | string = initialValue
  if (val) {
    const int = val.toString().split('.')
    const str: string = int[0]
    value = str.startsWith('-')
      ? `${str.substring(1).replace(/(.)(?=(.{3})+$)/g, '$1,')}-`
      : str.replace(/(.)(?=(.{3})+$)/g, '$1,')

    if (int.length == 2) {
      value = `${value}.${int[1]}`
    }
  }

  return currency ? `${value} ${currency}` : `${value}`
}

/**
 * Roune number
 * ***********************************/
export function round(num: number) {
  if (num % 1 === 0) {
    return num
  }
  return Math.round(num * 100) / 100
}

/**
 * retrun value or havenot String
 * ***********************************/
export function haveNot(val: unknown) {
  return val ?? 'ندارد'
}

/**
 * Determine file size
 * ***********************************/
export function fileSize(val: number) {
  const size = val
  const kilobyte = 1024
  const megabyte = kilobyte * kilobyte

  if (size > megabyte) {
    return round(size / megabyte) + ' مگابایت'
  } else if (size > kilobyte) {
    return round(size / kilobyte) + ' کیلوبایت'
  } else if (size >= 0) {
    return size + ' بایت'
  }

  return 'N/A'
}

export function cartNumber(
  val: number | NumberString | string | null,
  separateChar: string = $t('common.cartNumberSeparator')
) {
  return String(val)
    .split('')
    .reverse()
    .join('')
    .replace(/-/g, '')
    .replace(/\B(?=(\d{4})+(?!\d))/g, separateChar)
    .split('')
    .reverse()
    .join('')
}

export function convertNumbers2English(string: any) {
  return string
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (c: any) {
      return c.charCodeAt(0) - 1632
    })
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (c: any) {
      return c.charCodeAt(0) - 1776
    })
}

export function utcToJalaali(utc: string): string {
  let val = ''
  const str = utc.split('T')
  const date = str[0]?.split('-')
  const jDate = date
    ? jalaali.toJalaali(Number(date[0]), Number(date[1]), Number(date[2]))
    : ''
  const time = str[1]?.split(':')
    ? `${str[1]?.split(':')[0]}:${str[1]?.split(':')[1]}`
    : ''
  //@ts-ignore
  const strDate = Boolean(jDate.jm && jDate.jy && jDate.jd)
    ? //@ts-ignore
      `${jDate.jy}/${jDate.jm}/${jDate.jd}`
    : ''

  return `${strDate}` + (time ? ` - ${time}` : '')
}

export function mg2g(value: string | number): number {
  return value ? Number(value) / 1000 : 0
}

export function g2mg(value: string | number): number {
  return value ? Number(value) * 1000 : 0
}

export function priceMg2PriceG(value: string | number): number {
  return value ? Number(value) * 1000 : 0
}

export function maxFloorCount(value: string): string {
  let val = ''
  if (Number(value) || Number(value) == 0) {
    const t = value.toString().split('.')
    val = t.length > 1 ? `${t[0]}.${t[1].substring(0, 3)}` : value
  }

  return val
}

export function filterDataListPriceChart(dataList: TChartDataList): TChartDataList {
  return dataList.map((item) =>
    !!item?.avg?.Valid
      ? item
      : { avg: { Int64: null, Valid: false }, bucket: item.bucket }
  )
}

export function dayPriceChart(dataList: TChartDataList): TChartStates {
  const t = filterDataListPriceChart(dataList)
  const labels: string[] = []
  const values: (number | null)[] = []

  t.forEach((item) => {
    labels.push(item.bucket.split('T')?.[1].replace(/:00?z/i, ''))
    values.push(item.avg.Int64 ? priceMg2PriceG(item.avg.Int64) : null)
  })
  return { labels, values }
}

export function datePriceChart(dataList: TChartDataList): TChartStates {
  const t = filterDataListPriceChart(dataList)
  const labels: string[] = []
  const values: (number | null)[] = []

  t.forEach((item) => {
    labels.push(utcToJalaali(item.bucket.split('T')?.[0]))
    values.push(item.avg.Int64 ? priceMg2PriceG(item.avg.Int64) : null)
  })

  return { labels, values }
}

export function getFinancialRangeLabel(value: string | number, isToman: boolean = true) {
  let num = Number(value)

  if (isNaN(num)) {
    return 'عدد نامعتبر'
  }

  if (isToman) {
    num = num / 10
  }

  const absoluteNum = Math.abs(num)

  if (absoluteNum === 0) return 'صفر'

  if (absoluteNum < 1000) return ''

  if (absoluteNum >= 1000 && absoluteNum < 1000000) {
    return Number(num / 1000)?.toFixed(2) + 'هزار '
  }

  if (absoluteNum >= 1000000 && absoluteNum < 1000000000) {
    return Number(num / 1000000)?.toFixed(2) + 'میلیون '
  }

  if (absoluteNum >= 1000000000 && absoluteNum < 1000000000000) {
    return Number(num / 1000000000)?.toFixed(2) + 'میلیارد '
  } else {
    if (isToman) {
      return Number(num / 1000000000000)?.toFixed(2) + 'همت '
    } else {
      return Number(num / 1000000000000)?.toFixed(2) + 'تریلیون '
    }
  }
}

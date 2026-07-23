export const YEARS = new Array(100).fill(1).map((prev, current) => {
  const value = prev + current + 1300
  return {
    title: value,
    value
  }
})

export const DAYS_30 = new Array(30).fill(1).map((prev, current) => {
  const value = prev + current < 10 ? `0${prev + current}` : String(prev + current)
  return {
    title: value,
    value
  }
})
export const DAYS_31 = new Array(31).fill(1).map((prev, current) => {
  const value = prev + current < 10 ? `0${prev + current}` : String(prev + current)
  return {
    title: value,
    value
  }
})

export const MONTHS = [
  { title: 'فروردین', value: '01' },
  { title: 'اردیبهشت', value: '02' },
  { title: 'خرداد', value: '03' },
  { title: 'تیر', value: '04' },
  { title: 'مرداد', value: '05' },
  { title: 'شهریور', value: '06' },
  { title: 'مهر', value: '07' },
  { title: 'آبان', value: '08' },
  { title: 'آذر', value: '09' },
  { title: 'دی', value: '10' },
  { title: 'بهمن', value: '11' },
  { title: 'اسفند', value: '12' }
]

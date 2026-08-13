import * as XLSX from 'xlsx'

addEventListener('message', (event: MessageEvent) => {
  const message = JSON.parse(event.data)

  const tableStructure = message.headers.reduce(
    (output: any, el: any) => {
      if (!output.columns.includes(el.dataIndex)) {
        return {
          headers: [...output.headers, el.title],
          columns: [...output.columns, el.dataIndex]
        }
      }
      return output
    },
    { headers: [], columns: [] }
  )

  const formattedData = message.results.map((row: any) => {
    const newRow: any = {}
    tableStructure.columns.forEach((col: string, index: number) => {
      let value = row[col]

      if (value == null) {
        value = '--'
      }

      newRow[tableStructure.headers[index]] = value
    })
    return newRow
  })

  const worksheet = XLSX.utils.json_to_sheet(formattedData)

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  postMessage(blob)
})

import { useState, useRef } from 'react'
import type { TCsvColumns } from '@ts/Common'

type TConfig = {
  tableColumns: TCsvColumns
}

export function useCsvBuilder({ tableColumns }: TConfig) {
  const [csvLoading, setCsvLoading] = useState(false)
  const csvBuilderWorker = useRef<Worker>(undefined)

  const killThread = () => {
    setCsvLoading(false)
    csvBuilderWorker.current?.terminate()
  }

  const download = (csvContent: any, nameFile: string) => {
    if (!csvContent) {
      return
    }
    const hiddenElement = document.createElement('a')
    hiddenElement.href = URL.createObjectURL(csvContent)
    hiddenElement.target = '_blank'
    // @ts-ignore
    hiddenElement.download = `${nameFile}.xlsx`
    hiddenElement.click()
    URL.revokeObjectURL(hiddenElement.href)
    hiddenElement.remove()
  }

  const getDataCsv = async (payload: any, nameFile: string) => {
    setCsvLoading(true)

    try {
      csvBuilderWorker.current = new Worker(
        new URL('../workers/csvBuilder.ts', import.meta.url),
        { type: 'module' }
      )

      csvBuilderWorker.current.onmessage = ({ data }) => {
        download(data, nameFile)
        killThread()
      }

      csvBuilderWorker.current.onerror = (event) => {
        console.log('Unexpected worker error: ', event)
        killThread()
      }

      csvBuilderWorker.current.postMessage(
        JSON.stringify({
          headers: tableColumns,
          results: payload || []
        })
      )
    } catch (e) {
      killThread()
    }
  }

  return {
    getDataCsv,
    csvLoading
  }
}

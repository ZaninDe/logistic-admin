'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { read, utils, WorkBook } from 'xlsx'

interface InputFileProps {
  tableData: any[]
  onTableData: (param: any) => void
}

export const InputFile = ({ tableData, onTableData }: InputFileProps) => {
  const [fileName, setFileName] = useState<string>('Escolha um arquivo')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook: WorkBook = read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const table = utils.sheet_to_json(worksheet, { header: 1 })

        // const tableWithoutHeader = table.slice(1);
        onTableData(table)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <label className="w-full h-full bg-black px-4 py-2 rounded cursor-pointer">
      <span>{fileName}</span>
      <input
        type="file"
        onChange={handleFileChange}
        className="sr-only"
        placeholder="Escolha uma planilha"
      />
    </label>
  )
}

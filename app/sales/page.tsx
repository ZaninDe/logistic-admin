'use client'
import { Button } from '@/components/ui/button'
import { InputFile } from '@/components/ui/inputs/file-input'
import { useState } from 'react'
import axios from 'axios'

export interface TableProps {
  tp_ped: string
  date: string
  dt_lib: string
  re: string
  te: string
  pedido: number
  nf: string
  valor: string
  cliente: string
  nome_fantasia: string
  municipio: string
  bairro: string
  peso: number
  t: string
  vendedor: string
  endereco: string
}

const SalesPage = () => {
  const [tableData, setTableData] = useState<any[]>([])

  const handleSubmit = async () => {
    try {
      const fullAddressTable: TableProps[] = tableData.map((item: any) => ({
        tp_ped: item[0],
        date: item[1],
        dt_lib: item[2],
        re: item[3],
        te: item[4],
        pedido: item[5],
        nf: item[6],
        valor: item[7],
        cliente: item[8],
        nome_fantasia: item[9],
        municipio: item[10],
        bairro: item[11],
        peso: item[12],
        t: item[13],
        vendedor: item[14],
        endereco: item[15] + ' - ' + item[10],
      }))

      fullAddressTable.shift()

      console.log(fullAddressTable)
      const response = await axios.post(
        'http://localhost:3000/api/sales',
        fullAddressTable,
      )

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center p-4">
      {tableData.length === 0 ? (
        <Button className="p-0">
          <InputFile tableData={tableData} onTableData={setTableData} />
        </Button>
      ) : (
        <Button onClick={handleSubmit}>Enviar</Button>
      )}

      {tableData.length > 0 && (
        <div className="mt-8 max-w-[80vw] p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Uploaded Table</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {tableData.length > 0 &&
                    tableData[0].map((header: any, index: number) => (
                      <th key={index} className="px-4 py-2 text-black">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row: any[], rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-gray' : ''}
                  >
                    {row.map((cell: any, cellIndex: number) => {
                      if (cellIndex === row.length - 1) {
                        return (
                          <td key={cellIndex} className="px-4 py-2">
                            {cell}
                          </td>
                        )
                      } else {
                        return (
                          <td key={cellIndex} className="px-4 py-2">
                            {cell}
                          </td>
                        )
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalesPage

'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SalesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { useState } from 'react'
import axios from 'axios'
import { InputFile } from '@/components/ui/inputs/file-input'
import { useSaleModal } from '@/hooks/use-sale-modal'

interface SaleDataProps {
  data: SalesColumn[]
}

export default function SaleClient({ data }: SaleDataProps) {
  // const [tableData, setTableData] = useState<any[]>([])

  // const handleSubmit = async () => {
  //   try {
  //     const fullAddressTable: SalesColumn[] = tableData.map((item: any) => ({
  //       tp_ped: item[0],
  //       date: item[1],
  //       date_lib: item[2],
  //       id: item[5],
  //       nf: item[6],
  //       valor: item[7],
  //       cliente: item[8],
  //       nome_fantasia: item[9],
  //       peso: item[12],
  //       vendedor: item[14],
  //       endereco: item[15] + ' - ' + item[10],
  //       orderCode: item[5],
  //     }))

  //     fullAddressTable.shift()

  //     console.log(fullAddressTable)
  //     const response = await axios.post(
  //       'http://localhost:3000/api/sales',
  //       fullAddressTable,
  //     )

  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const [open, setOpen] = useState(false)

  const storeModal = useSaleModal()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Vendas (${data.length})`}
          description="Gerenciamento das vendas"
        />

        <Button
          onClick={() => {
            setOpen(false)
            storeModal.onOpen()
          }}
          className="bg-foreground"
        >
          Adicionar planilha de vendas
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="pedido" columns={columns} data={data} />
    </>
  )
}

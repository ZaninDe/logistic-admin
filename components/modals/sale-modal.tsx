'use client'

import { useState } from 'react'
import { useSaleModal } from '@/hooks/use-sale-modal'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SalesColumn } from '@/app/(dashboard)/(routes)/vendas/components/columns'
import axios from 'axios'
import { InputFile } from '../ui/inputs/file-input'
import { useRouter } from 'next/navigation'
import { DatePicker } from '../ui/date-picker'

export function SaleModal() {
  const storeModal = useSaleModal()
  const [tableData, setTableData] = useState<any[]>([])

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const fullAddressTable: SalesColumn[] = tableData.map((item: any) => ({
        tp_ped: item[0],
        date: item[1],
        date_lib: item[2],
        pedido: item[5].toString(),
        nf: item[6],
        valor: item[7],
        cliente: item[8],
        nome_fantasia: item[9],
        peso: item[12],
        vendedor: item[14],
        endereco: item[15] + ' - ' + item[10],
      }))

      fullAddressTable.shift()

      console.log(fullAddressTable)
      const response = await axios.post(
        'http://localhost:3000/api/sales',
        fullAddressTable,
      )

      router.refresh()
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      title="Vendas"
      description="Importar nova tabela de vendas"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="flex pb-10 pt-4 justify-end">
        <Button className="p-0 mr-4">
          <InputFile tableData={tableData} onTableData={setTableData} />
        </Button>

        <DatePicker />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={tableData.length === 0}
          className="bg-foreground"
        >
          Enviar
        </Button>
      </div>
    </Modal>
  )
}

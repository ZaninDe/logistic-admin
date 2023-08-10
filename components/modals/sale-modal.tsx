/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { format } from 'date-fns'
import { date } from 'zod'

export function SaleModal() {
  const storeModal = useSaleModal()
  const [tableData, setTableData] = useState<any[]>([])
  const [deliveryDate, setDeliveryDate] = useState<Date>()

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (deliveryDate) {
        const formattedDeliveryDate = format(
          deliveryDate,
          "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        )
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
          deliveryDate: formattedDeliveryDate,
        }))

        fullAddressTable.shift()

        console.log(fullAddressTable)
        const response = await axios.post(
          'http://localhost:3000/api/sales',
          fullAddressTable,
        )

        router.refresh()
        console.log(response.data)
      } else {
        return new Error('Selecione uma data')
      }
    } catch (error) {
      console.log(error)
    } finally {
      storeModal.onClose()
    }
  }

  return (
    <Modal
      title="Vendas"
      description="Importar nova tabela de vendas"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="flex pb-10 pt-4 justify-center">
        <Button className="p-0 mr-4">
          <InputFile tableData={tableData} onTableData={setTableData} />
        </Button>

        <DatePicker
          deliveryDate={deliveryDate}
          // @ts-ignore
          onChangeDeliveryDate={setDeliveryDate}
        />
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

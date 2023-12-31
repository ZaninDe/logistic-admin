import { format, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import prismadb from '@/app/libs/prismadb'
import SaleClient from './components/sale'
import { SalesColumn } from './components/columns'

export default async function SalesPage() {
  const sales = await prismadb.sale.findMany()

  const formatedSales: SalesColumn[] = sales.map((item) => ({
    tp_ped: item?.orderType,
    date: format(item?.saleDate, 'd/MM/yyyy', { locale: ptBR }),
    date_lib: format(item?.saleDate, 'd/MM/yyyy', { locale: ptBR }),
    nf: item?.orderCode,
    valor: Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(item?.totalPrice),
    cliente: item?.customerName,
    nome_fantasia: item?.fantasyName,
    peso: `${item?.totalWeight}Kg`,
    vendedor: item?.seller,
    endereco: item?.address,
    pedido: item?.orderCode,
    dataEntrega: format(addDays(item?.deliveryDate, 1), 'd/MM/yyyy', {
      locale: ptBR,
    }),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SaleClient data={formatedSales} />
      </div>
    </div>
  )
}

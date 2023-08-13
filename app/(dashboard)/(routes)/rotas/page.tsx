import { format, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import prismadb from '@/app/libs/prismadb'
import RouteClient from './components/route'
import { RoutesColumn } from './components/columns'

export default async function SalesPage() {
  const sales = await prismadb.sale.findMany()

  const formatedSales: RoutesColumn[] = sales.map((item) => ({
    pedido: item?.orderCode,
    veiculo: 'Veiculo',
    endereco: item?.address,
    nf: item?.orderCode,
    nome_fantasia: item?.fantasyName,
    peso: item?.totalWeight,
    dataEntrega: format(addDays(item?.deliveryDate, 1), 'd/MM/yyyy', {
      locale: ptBR,
    }),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RouteClient data={formatedSales} />
      </div>
    </div>
  )
}

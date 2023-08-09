import prismadb from '@/app/libs/prismadb'
import { TableProps } from '@/app/sales/page'
import { formatDate } from '@/app/utils/dateFormat'
import { data } from 'autoprefixer'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const body = await request.json()

  const saleSchema = z.array(
    z.object({
      tp_ped: z.string(),
      date: z.string(),
      dt_lib: z.string(),
      re: z.any().optional(),
      te: z.any().optional(),
      pedido: z.string(),
      nf: z.any(),
      valor: z.number(),
      cliente: z.string(),
      nome_fantasia: z.string().optional(),
      municipio: z.string(),
      bairro: z.string(),
      peso: z.number(),
      t: z.any().optional(),
      vendedor: z.string(),
      endereco: z.string(),
    }),
  )

  const data = saleSchema.parse(body)

  const formatedData = data.map((data: any) => ({
    orderCode: data.pedido,
    saleDate: formatDate(data.date),
    customerName: data.cliente,
    totalWeight: data.peso,
    address: data.endereco,
    seller: data.vendedor,
    totalPrice: data.valor,
    fantasyName: data.nome_fantasia,
  }))

  const sales = await prismadb.sale.createMany({
    data: formatedData,
  })
  return NextResponse.json(sales, { status: 201 })
}

export async function GET(request: Request) {
  const sales = await prismadb.sale.findMany()

  return NextResponse.json(sales)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const deleteSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteSchema.parse(body)

  const sales = await prismadb.sale.deleteMany({
    where: {
      orderCode: id,
    },
  })

  return NextResponse.json(sales)
}

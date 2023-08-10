import prismadb from '@/app/libs/prismadb'
import { formatDate } from '@/app/utils/dateFormat'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const body = await request.json()

  const saleSchema = z.array(
    z.object({
      tp_ped: z.string().optional(),
      date: z.string().optional(),
      dt_lib: z.string().optional(),
      re: z.any().optional(),
      te: z.any().optional(),
      pedido: z.string().optional(),
      nf: z.any().optional(),
      valor: z.number().optional(),
      cliente: z.string().optional(),
      nome_fantasia: z.string().optional(),
      municipio: z.string().optional(),
      bairro: z.string().optional(),
      peso: z.number().optional(),
      t: z.any().optional(),
      vendedor: z.string().optional(),
      endereco: z.string().optional(),
      orderCode: z.string().optional(),
      deliveryDate: z.string().optional(),
    }),
  )

  const data = saleSchema.parse(body)

  const formatedData = data.map((data: any) => ({
    orderType: data.tp_ped,
    orderCode: data.pedido.toString(),
    saleDate: formatDate(data.date),
    customerName: data.cliente,
    totalWeight: data.peso,
    address: data.endereco,
    seller: data.vendedor,
    totalPrice: data.valor,
    fantasyName: data.nome_fantasia,
    deliveryDate: data.deliveryDate,
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
  // const body = await request.json()
  // const deleteSchema = z.object({
  //   id: z.string(),
  // })

  // const { id } = deleteSchema.parse(body)

  const sales = await prismadb.sale.deleteMany({
    // where: {
    //   orderCode: id,
    // },
  })

  return NextResponse.json(sales)
}

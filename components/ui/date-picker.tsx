'use client'

import { useState } from 'react'
import { format, setDate } from 'date-fns'
import { Calendar as CalendarIcon } from '@phosphor-icons/react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { ptBR } from 'date-fns/locale'

interface DatePickerProps {
  deliveryDate: any
  onChangeDeliveryDate: () => void
}

export function DatePicker({
  deliveryDate,
  onChangeDeliveryDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !deliveryDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {deliveryDate ? (
            format(deliveryDate, 'PPP', { locale: ptBR })
          ) : (
            <span>Data de entrega</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={deliveryDate}
          onSelect={onChangeDeliveryDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

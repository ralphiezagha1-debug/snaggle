import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import 'react-day-picker/dist/style.css'
export function Calendar({ className, ...props }: any) {
  return <DayPicker className={cn('p-3', className)} {...props} />
}

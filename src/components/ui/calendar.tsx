"use client"

import * as React from "react"
import { DayPicker, type DayPickerSingleProps } from "react-day-picker"
import { cn } from "@/lib/utils"
import "react-day-picker/dist/style.css"

export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, "classNames" | "styles"> &
  Partial<Pick<DayPickerSingleProps, "mode">>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      {...props}
    />
  )
}

export { Calendar }

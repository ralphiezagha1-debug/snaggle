"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> ;
export function ChartContainer({ className, ...props }: ChartContainerProps) {
  return <div className={cn("w-full", className)} {...props} />
}

export type ChartTooltipProps = React.HTMLAttributes<HTMLDivElement> ;
export function ChartTooltip({ className, ...props }: ChartTooltipProps) {
  return <div className={cn("rounded-md border bg-background p-2 text-sm shadow", className)} {...props} />
}

export type ChartLegendProps = React.HTMLAttributes<HTMLDivElement> ;
export function ChartLegend({ className, ...props }: ChartLegendProps) {
  return <div className={cn("flex flex-wrap items-center gap-2 text-xs", className)} {...props} />
}

export const ChartTooltipContent = ChartTooltip
export const ChartLegendContent = ChartLegend


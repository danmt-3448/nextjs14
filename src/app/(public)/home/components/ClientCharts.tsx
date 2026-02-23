'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Lazy load only on client side after mount
const HomeKpis = dynamic(() => import('./HomeKpis').then((mod) => ({ default: mod.HomeKpis })))
const HomeCharts = dynamic(() => import('./HomeCharts').then((mod) => ({ default: mod.HomeCharts })))
const HomePerformance = dynamic(() => import('./HomePerformance').then((mod) => ({ default: mod.HomePerformance })))

type Monthly = { month: string; revenue: number; users: number }
type Product = { name: string; value: number; color: string }

export function ClientCharts({
  monthlyData,
  productSales,
}: {
  monthlyData: Monthly[]
  productSales: Product[]
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-8">
        {/* KPIs skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-white shadow" />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="col-span-2 h-96 animate-pulse rounded-lg bg-white shadow" />
          <div className="h-96 animate-pulse rounded-lg bg-white shadow" />
        </div>

        {/* Performance skeleton */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-white shadow" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <HomeKpis />
      <HomeCharts monthlyData={monthlyData} productSales={productSales} />
      <HomePerformance monthlyData={monthlyData} />
    </>
  )
}

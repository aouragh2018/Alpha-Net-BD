"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyLoadingSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  skeletonHeight?: string
  skeletonCount?: number
}

export function LazyLoadingSection({
  children,
  className = "",
  delay = 500,
  skeletonHeight = "h-32",
  skeletonCount = 3,
}: LazyLoadingSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])

  return (
    <div ref={ref} className={className}>
      {isLoaded ? (
        <div className="animate-in fade-in-50 duration-500">{children}</div>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton key={index} className={`w-full ${skeletonHeight} animate-pulse`} />
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  colorScheme?: 'blue' | 'orange' | 'default';
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  colorScheme = 'default',
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  // Styling khusus untuk setiap color scheme
  const getTrackStyles = () => {
    switch (colorScheme) {
      case 'blue':
        return {
          background: 'linear-gradient(to right, #dbeafe, #bfdbfe, #93c5fd)',
          border: '1px solid #3b82f6'
        };
      case 'orange':
        return {
          background: 'linear-gradient(to right, #fed7aa, #fdba74, #fb923c)',
          border: '1px solid #ea580c'
        };
      default:
        return {};
    }
  };

  const getRangeStyles = () => {
    switch (colorScheme) {
      case 'blue':
        return {
          background: 'linear-gradient(to right, #3b82f6, #06b6d4)'
        };
      case 'orange':
        return {
          background: 'linear-gradient(to right, #ea580c, #ec4899)'
        };
      default:
        return {};
    }
  };

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5"
        style={getTrackStyles()}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full rounded-full"
          style={getRangeStyles()}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "border-2 bg-white ring-ring/50 block size-5 shrink-0 rounded-full shadow-lg transition-all hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 hover:scale-110",
            colorScheme === 'blue' 
              ? "border-blue-500 hover:border-blue-600 hover:ring-blue-200" 
              : colorScheme === 'orange' 
              ? "border-orange-500 hover:border-orange-600 hover:ring-orange-200" 
              : "border-primary hover:border-primary/80"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
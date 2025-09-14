'use client'

import { cn } from '@/lib/utils'

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabel?: boolean
  label?: string
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger'
}

export function CircularProgress({ 
  value, 
  size = 40, 
  strokeWidth = 3,
  className = '',
  showLabel = true,
  label,
  variant = 'default'
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference

  // Determine color based on variant or value
  const getColor = () => {
    if (variant !== 'default') {
      switch (variant) {
        case 'brand': return 'var(--brand)'
        case 'success': return 'var(--safe)'
        case 'warning': return 'var(--warn)'
        case 'danger': return 'var(--danger)'
        default: return 'var(--brand)'
      }
    }
    
    // Auto color based on value
    if (value >= 80) return 'var(--safe)'
    if (value >= 40) return 'var(--warn)'
    return 'var(--danger)'
  }

  const color = getColor()

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-[var(--text-primary)]">
            {label || `${Math.round(value)}%`}
          </span>
        </div>
      )}
    </div>
  )
}
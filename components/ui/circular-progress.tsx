'use client'

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function CircularProgress({ 
  value, 
  size = 40, 
  strokeWidth = 3,
  className = ''
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  // Determine color based on value
  const getColor = () => {
    if (value >= 80) return '#10B981' // safe (green)
    if (value >= 40) return '#F59E0B' // warn (orange)
    return '#EF4444' // danger (red)
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
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
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <span className="absolute text-xs font-medium text-gray-300">
        {value}%
      </span>
    </div>
  )
}
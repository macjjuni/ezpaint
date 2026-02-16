import { useRef } from 'react'
import { useThick, useSetThick, useColor } from '@/store/store'
import { useClickOutside } from '@/hooks/useClickOutside'
import styles from './Range.module.css'

interface RangeProps {
  onClose: () => void
}

const Range = ({ onClose }: RangeProps) => {
  const thick = useThick()
  const setThick = useSetThick()
  const color = useColor()
  const rangeRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThick(Number(e.target.value))
  }

  useClickOutside(rangeRef, onClose)

  return (
    <div
      ref={rangeRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg px-4 py-3 border border-gray-200/80 z-[9999]"
    >
      <div className="flex items-center gap-4">
        {/* Preview Circle */}
        <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
          <div
            className="rounded-full transition-all duration-150 shadow-sm"
            style={{
              backgroundColor: color,
              width: `${thick}px`,
              height: `${thick}px`,
            }}
          />
        </div>

        {/* Slider */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={thick}
            onChange={handleChange}
            className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${styles['slider-thumb']}`}
            style={{
              background: `linear-gradient(to right, ${color} 0%, ${color} ${((thick - 1) / 24) * 100}%, #e5e7eb ${((thick - 1) / 24) * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-sm font-medium text-gray-700 w-8 text-right">{thick}px</span>
        </div>
      </div>
    </div>
  )
}

export default Range

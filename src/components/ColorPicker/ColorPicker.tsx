import { useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useColor, useSetColor } from '@/store/store'
import { useClickOutside } from '@/hooks/useClickOutside'

interface IColorPicker {
  renderToggle: () => void
}

const ColorPicker = ({ renderToggle }: IColorPicker) => {
  const color = useColor()
  const setColor = useSetColor()
  const pickerRef = useRef<HTMLDivElement>(null)

  useClickOutside(pickerRef, renderToggle, ['.colorful'])

  return (
    <div ref={pickerRef} className="absolute top-0 right-[calc(100%+8px)] z-[10000]">
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  )
}

export default ColorPicker

import { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import ColorPickerStyled from './style'
import { useBearStore } from '@/zustand/store'

interface IColorPicker {
  renderToggle: () => void
}

const ColorPicker = ({ renderToggle }: IColorPicker) => {
  const { color, setColor } = useBearStore((state) => state)

  const clickCheck = (e: MouseEvent) => {
    const ele = e.target as HTMLElement
    const isContain = ele.className.includes('colorful')
    if (!isContain) renderToggle()
  }

  useEffect(() => {
    window.addEventListener('click', clickCheck)
    return () => {
      window.removeEventListener('click', clickCheck)
    }
  }, [])

  return (
    <ColorPickerStyled className="colorful">
      <HexColorPicker color={color} onChange={setColor} />
    </ColorPickerStyled>
  )
}

export default ColorPicker

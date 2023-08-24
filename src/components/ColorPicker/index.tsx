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

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const isContain = target.classList.contains('react-colorful__saturation-pointer')
    if (isContain) {
      setTimeout(() => {
        renderToggle()
      }, 150)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickCheck)
    return () => {
      window.removeEventListener('click', clickCheck)
    }
  }, [])

  return (
    <ColorPickerStyled className="colorful" onMouseUp={onMouseUp}>
      <HexColorPicker color={color} onChange={setColor} />
    </ColorPickerStyled>
  )
}

export default ColorPicker

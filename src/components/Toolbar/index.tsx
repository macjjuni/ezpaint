import { useState } from 'react'
import { BsPencilFill, BsCrop, BsTrash } from 'react-icons/bs'
import { useBearStore } from '@/zustand/store'
import ToolbarStyled from './style'
import ColorPicker from '../ColorPicker'
import Button from '@/components/Button'

interface IToolbar {
  isRender: boolean
  resetCanvas: () => void
}

interface IRender {
  picker: boolean
  pen: boolean
  crop: boolean
}

const renderClear: IRender = {
  picker: false,
  pen: false,
  crop: false,
}

const Toolbar = ({ isRender, resetCanvas }: IToolbar) => {
  const { color } = useBearStore((state) => state)
  const [render, setRender] = useState<IRender>(renderClear)

  const togglePicker = () => {
    setRender((prev) => ({ ...renderClear, picker: !prev.picker }))
  }
  const togglePen = () => {
    setRender((prev) => ({ ...renderClear, pen: !prev.pen }))
  }
  const toggleCrop = () => {
    setRender((prev) => ({ ...renderClear, crop: !prev.crop }))
  }

  return (
    <ToolbarStyled.Wrap active={isRender}>
      {render.picker && <ColorPicker renderToggle={togglePicker} />}
      <ToolbarStyled.List>
        <Button onClick={togglePicker} className={render.picker ? 'active colorful' : 'colorful'} width={44} height={44} padding="0" borderRadius={4}>
          <ToolbarStyled.Color className="colorful" color={color} />
        </Button>
        <Button onClick={togglePen} className={render.pen ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsPencilFill fontSize={24} />
        </Button>
        <Button onClick={toggleCrop} className={render.crop ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsCrop fontSize={24} />
        </Button>
        <Button onClick={resetCanvas} width={44} height={44} padding="0" borderRadius={4}>
          <BsTrash fontSize={24} />
        </Button>
      </ToolbarStyled.List>
    </ToolbarStyled.Wrap>
  )
}

export default Toolbar

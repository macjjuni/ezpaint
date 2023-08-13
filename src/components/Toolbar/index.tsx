import { useState, useCallback } from 'react'
import { BsPencilFill, BsCrop, BsTrash } from 'react-icons/bs'
import { useBearStore } from '@/zustand/store'
import ToolbarStyled from './style'
import ColorPicker from '../ColorPicker'
import Button from '@/components/Button'

interface IToolbar {
  isRender: boolean
  resetCanvas: () => void
}

const Toolbar = ({ isRender, resetCanvas }: IToolbar) => {
  const { color } = useBearStore((state) => state)
  const [isColorPicker, setColorPicker] = useState(false)

  const togglePicker = useCallback(() => {
    setColorPicker((prev) => !prev)
  }, [isColorPicker])

  return (
    <ToolbarStyled.Wrap active={isRender}>
      {isColorPicker && <ColorPicker renderToggle={togglePicker} />}
      <ToolbarStyled.List>
        <Button className="colorful" width={44} height={44} padding="0" borderRadius={4} onClick={togglePicker}>
          <ToolbarStyled.Color className="colorful" color={color} />
        </Button>
        <Button width={44} height={44} padding="0" borderRadius={4}>
          <BsPencilFill fontSize={24} />
        </Button>
        <Button width={44} height={44} padding="0" borderRadius={4}>
          <BsCrop fontSize={24} />
        </Button>
        <Button width={44} height={44} padding="0" borderRadius={4} onClick={resetCanvas}>
          <BsTrash fontSize={24} />
        </Button>
      </ToolbarStyled.List>
    </ToolbarStyled.Wrap>
  )
}

export default Toolbar

import { BsPencilFill, BsCrop, BsTrash } from 'react-icons/bs'
import { FiDownload } from 'react-icons/fi'
import { LuUndo2 } from 'react-icons/lu'
import { useBearStore } from '@/zustand/store'
import ToolbarStyled from './style'
import ColorPicker from '../ColorPicker'
import Range from '../Range'
import Button from '@/components/Button'

interface IToolbar {
  isRender: boolean
  resetCanvas: () => void
  undoCanvas: () => void
  download: () => void
}

const Toolbar = ({ isRender, resetCanvas, undoCanvas, download }: IToolbar) => {
  const { color, thick, tool, setTool } = useBearStore((state) => state)

  const togglePicker = () => {
    if (tool !== 'picker') setTool('picker')
    else setTool('pen')
  }
  const toggleThick = () => {
    if (tool !== 'thick') setTool('thick')
    else setTool('pen')
  }
  const togglePen = () => {
    if (tool !== 'pen') setTool('pen')
    else setTool('pen')
  }
  const toggleCrop = () => {
    setTool('crop')
  }

  return (
    <ToolbarStyled.Wrap active={isRender}>
      <ToolbarStyled.Left>
        {tool === 'picker' && <ColorPicker renderToggle={togglePicker} />}
        {tool === 'thick' && <Range renderToggle={toggleThick} />}
      </ToolbarStyled.Left>
      <ToolbarStyled.Right>
        <Button onClick={togglePicker} className={tool === 'picker' ? 'active colorful' : 'colorful'} width={44} height={44} padding="0" borderRadius={4}>
          <ToolbarStyled.Color className="colorful" color={color} />
        </Button>
        <Button onClick={toggleThick} className={tool === 'thick' ? 'active rangeslider' : 'rangeslider'} width={44} height={44} padding="0" borderRadius={4}>
          <ToolbarStyled.Thick className="rangeslider" thick={thick} color={color} />
        </Button>
        <Button onClick={togglePen} className={tool === 'pen' ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsPencilFill fontSize={24} />
        </Button>
        <Button onClick={toggleCrop} className={tool === 'crop' ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsCrop fontSize={24} />
        </Button>
        <Button onClick={undoCanvas} width={44} height={44} padding="0" borderRadius={4}>
          <LuUndo2 fontSize={24} />
        </Button>
        <Button onClick={download} width={44} height={44} padding="0" borderRadius={4}>
          <FiDownload fontSize={24} color="#fff" />
        </Button>
        {/* <Button onClick={redoCanvas} width={44} height={44} padding="0" borderRadius={4}>
          <LuRedo2 fontSize={24} />
        </Button> */}

        <Button onClick={resetCanvas} width={44} height={44} padding="0" borderRadius={4}>
          <BsTrash fontSize={24} />
        </Button>
      </ToolbarStyled.Right>
    </ToolbarStyled.Wrap>
  )
}

export default Toolbar

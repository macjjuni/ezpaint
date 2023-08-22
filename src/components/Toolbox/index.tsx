import { BsPencilFill, BsCrop, BsTrash } from 'react-icons/bs'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { LuUndo2 } from 'react-icons/lu'
import { BiSolidCopy } from 'react-icons/bi'
import { TbCloudDownload } from 'react-icons/tb'
import { useBearStore } from '@/zustand/store'
import ToolboxStyled from './style'
import ColorPicker from '../ColorPicker'
import Range from '../Range'
import Button from '@/components/Button'

interface IToolbox {
  isRender: boolean
  reset: () => void
  undo: () => void
  recovery: () => void
  download: () => void
  copy: () => void
}

const Toolbox = ({ isRender, reset, undo, recovery, download, copy }: IToolbox) => {
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
    <ToolboxStyled.Wrap active={isRender}>
      <ToolboxStyled.Left>
        {tool === 'picker' && <ColorPicker renderToggle={togglePicker} />}
        {tool === 'thick' && <Range renderToggle={toggleThick} />}
      </ToolboxStyled.Left>
      <ToolboxStyled.Right>
        <Button onClick={togglePicker} tooltipText="색상 선택" className={tool === 'picker' ? 'active colorful' : 'colorful'} width={44} height={44} padding="0" borderRadius={4}>
          <ToolboxStyled.Color className="colorful" color={color} />
        </Button>
        <Button onClick={toggleThick} tooltipText="두께 선택" className={tool === 'thick' ? 'active rangeslider' : 'rangeslider'} width={44} height={44} padding="0" borderRadius={4}>
          <ToolboxStyled.Thick className="rangeslider" thick={thick} color={color} />
        </Button>
        <Button onClick={togglePen} tooltipText="그리기" className={tool === 'pen' ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsPencilFill fontSize={24} />
        </Button>
        <Button onClick={toggleCrop} tooltipText="자르기" className={tool === 'crop' ? 'active' : ''} width={44} height={44} padding="0" borderRadius={4}>
          <BsCrop fontSize={24} />
        </Button>

        <Button onClick={undo} tooltipText="되돌리기" width={44} height={44} padding="0" borderRadius={4}>
          <LuUndo2 fontSize={24} />
        </Button>
        <Button onClick={recovery} tooltipText="초기화" width={44} height={44} padding="0" borderRadius={4}>
          <MdOutlineCleaningServices fontSize={24} />
        </Button>
        <Button onClick={copy} tooltipText="클립보드 복사" width={44} height={44} padding="0" borderRadius={4}>
          <BiSolidCopy fontSize={24} />
        </Button>
        <Button onClick={download} tooltipText="다운로드" width={44} height={44} padding="0" borderRadius={4}>
          <TbCloudDownload fontSize={28} />
        </Button>

        {/* <Button onClick={redoCanvas} width={44} height={44} padding="0" borderRadius={4}>
          <LuRedo2 fontSize={24} />
        </Button> */}

        <Button onClick={reset} tooltipText="휴지통" width={44} height={44} padding="0" borderRadius={4}>
          <BsTrash fontSize={24} />
        </Button>
      </ToolboxStyled.Right>
    </ToolboxStyled.Wrap>
  )
}

export default Toolbox

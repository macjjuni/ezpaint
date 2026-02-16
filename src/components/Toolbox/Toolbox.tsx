import { useState } from 'react'
import { BsPencilFill, BsCrop, BsTrash } from 'react-icons/bs'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { LuUndo2 } from 'react-icons/lu'
import { BiSolidCopy } from 'react-icons/bi'
import { TbCloudDownload } from 'react-icons/tb'
import { useColor, useThick, useTool, useSetTool } from '@/store/store'
import { ColorPicker, Range, ButtonWithTooltip } from '@/components'

interface IToolbox {
  isRender: boolean
  reset: () => void
  undo: () => void
  recovery: () => void
  download: () => void
  copy: () => void
}

const Toolbox = ({ isRender, reset, undo, recovery, download, copy }: IToolbox) => {
  const color = useColor()
  const thick = useThick()
  const tool = useTool()
  const setTool = useSetTool()
  const [showThickPanel, setShowThickPanel] = useState(false)
  const [showPickerPanel, setShowPickerPanel] = useState(false)

  const togglePicker = () => {
    setShowPickerPanel(!showPickerPanel)
    if (tool !== 'pen') setTool('pen')
  }

  const closePicker = () => {
    setShowPickerPanel(false)
  }

  const toggleThick = () => {
    setShowThickPanel(!showThickPanel)
    if (tool !== 'pen') setTool('pen')
  }

  const closeThick = () => {
    setShowThickPanel(false)
  }
  const togglePen = () => {
    if (tool !== 'pen') setTool('pen')
    else setTool('pen')
  }
  const toggleCrop = () => {
    setTool('crop')
  }

  return (
    <div
      className={`
        absolute right-4 transition-all duration-[440ms] ease
        ${isRender ? 'top-4 opacity-100 z-[9999]' : '-top-20 opacity-0 -z-[9999]'}
      `}
    >
      <div className="relative flex items-center gap-1 bg-white rounded-lg shadow-lg px-2 py-2 border border-gray-200/80">
        {/* Drawing Tools Group */}
        <div className="flex items-center gap-1 px-1">
          <ButtonWithTooltip
            onClick={togglePicker}
            tooltipText="색상 선택"
            variant={showPickerPanel ? 'default' : 'ghost'}
            size="icon"
            className="colorful h-9 w-9"
          >
            <span
              className="w-5 h-5 border-2 border-white rounded-full shadow-sm"
              style={{ backgroundColor: color }}
            />
          </ButtonWithTooltip>
          <ButtonWithTooltip
            onClick={toggleThick}
            tooltipText="두께 선택"
            variant={showThickPanel ? 'default' : 'ghost'}
            size="icon"
            className="rangeslider h-9 w-9"
          >
            <span
              className="w-[70%] rounded-sm border-2 border-white shadow-sm"
              style={{
                backgroundColor: color,
                height: `${thick}px`
              }}
            />
          </ButtonWithTooltip>
          <ButtonWithTooltip
            onClick={togglePen}
            tooltipText="그리기"
            variant={tool === 'pen' ? 'default' : 'ghost'}
            size="icon"
            className="h-9 w-9"
          >
            <BsPencilFill fontSize={18} />
          </ButtonWithTooltip>
          <ButtonWithTooltip
            onClick={toggleCrop}
            tooltipText="자르기"
            variant={tool === 'crop' ? 'default' : 'ghost'}
            size="icon"
            className="h-9 w-9"
          >
            <BsCrop fontSize={18} />
          </ButtonWithTooltip>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300/60 mx-1" />

        {/* Edit Actions Group */}
        <div className="flex items-center gap-1 px-1">
          <ButtonWithTooltip onClick={undo} tooltipText="되돌리기(Ctrl+Z)" variant="ghost" size="icon" className="h-9 w-9">
            <LuUndo2 fontSize={18} />
          </ButtonWithTooltip>
          <ButtonWithTooltip onClick={recovery} tooltipText="초기화(Ctrl+R)" variant="ghost" size="icon" className="h-9 w-9">
            <MdOutlineCleaningServices fontSize={18} />
          </ButtonWithTooltip>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300/60 mx-1" />

        {/* Export Actions Group */}
        <div className="flex items-center gap-1 px-1">
          <ButtonWithTooltip onClick={copy} tooltipText="클립보드 복사(Ctrl+C)" variant="ghost" size="icon" className="h-9 w-9">
            <BiSolidCopy fontSize={18} />
          </ButtonWithTooltip>
          <ButtonWithTooltip onClick={download} tooltipText="다운로드(Ctrl+S)" variant="ghost" size="icon" className="h-9 w-9">
            <TbCloudDownload fontSize={20} />
          </ButtonWithTooltip>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300/60 mx-1" />

        {/* Danger Action */}
        <div className="flex items-center px-1">
          <ButtonWithTooltip onClick={reset} tooltipText="휴지통" variant="ghost" size="icon" className="h-9 w-9 hover:bg-red-50 hover:text-red-600">
            <BsTrash fontSize={18} />
          </ButtonWithTooltip>
        </div>

        {/* Range Slider Panel */}
        {showThickPanel && <Range onClose={closeThick} />}

        {/* Color Picker Panel */}
        {showPickerPanel && <ColorPicker renderToggle={closePicker} />}
      </div>
    </div>
  )
}

export default Toolbox

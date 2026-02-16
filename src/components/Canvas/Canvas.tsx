import { useEffect, useRef, useState } from 'react'
import { kToast, KSpinner } from 'kku-ui'
import { DropArea, Toolbox, Crop } from '@/components'
import { useColor, useThick, useTool, useSetTool, useSetInCanvas, useSetThick } from '@/store/store'
import {
  useCanvasIndexedDB,
  useCanvasHistory,
  useCanvasDrawing,
  useCanvasImage,
  useCanvasKeyboard,
} from '@/hooks'

const Canvas = () => {
  const color = useColor()
  const thick = useThick()
  const tool = useTool()
  const setTool = useSetTool()
  const setThick = useSetThick()
  const setInCanvas = useSetInCanvas()

  const [isImg, setImg] = useState(false) // 캔버스에 이미지 표시 여부, false인 경우 <DropArea /> 표시
  const [isLoading, setIsLoading] = useState(true) // IndexedDB 로딩 상태

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // IndexedDB 관리 (먼저 초기화)
  const { saveToIndexedDB, loadFromIndexedDB, clearIndexedDB } = useCanvasIndexedDB({
    canvasRef,
    canvasHistory: useRef([]),
    currentIndex: useRef(0),
    originImage: useRef(null),
    setImg,
    saveCurrentImage: () => {}, // 임시, 아래에서 재할당
  })

  // 히스토리 관리
  const {
    canvasHistory,
    currentIndex,
    originImage,
    currentImage,
    saveCurrentImage,
    resetData,
    recoverSaveCanvas,
    undoCanvas,
    recoveryCanvas,
  } = useCanvasHistory({
    canvasRef,
    saveToIndexedDB,
    tool,
    setTool,
  })

  // IndexedDB 훅에 실제 refs와 saveCurrentImage 전달
  const indexedDB = useCanvasIndexedDB({
    canvasRef,
    canvasHistory,
    currentIndex,
    originImage,
    setImg,
    saveCurrentImage,
  })

  // 드로잉 관리
  const { startDrawing, draw, endDrawing, endDrawCursor } = useCanvasDrawing({
    canvasRef,
    color,
    thick,
    saveCurrentImage,
    recoverSaveCanvas,
    saveToIndexedDB: indexedDB.saveToIndexedDB,
    setInCanvas,
  })

  // 이미지 작업 관리
  const { copyCanvas, pasteCanvas, paintImage, downCanvas, resetCanvas, cropConfig } =
    useCanvasImage({
      canvasRef,
      setImg,
      saveCurrentImage,
      resetData,
      recoverSaveCanvas,
      saveToIndexedDB: indexedDB.saveToIndexedDB,
      clearIndexedDB: indexedDB.clearIndexedDB,
      setTool,
      setInCanvas,
    })

  // 키보드 단축키
  useCanvasKeyboard({
    pasteCanvas,
    copyCanvas,
    undoCanvas,
    downCanvas,
    resetCanvas,
    recoveryCanvas,
    thick,
    setThick,
  })

  // 마우스 엔터 핸들러
  const onMouseEnter = () => {
    setInCanvas(true)
  }

  // 펜 도구 전용 드로잉 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (tool !== 'pen') return
    startDrawing(e)
  }

  // 초기화
  useEffect(() => {
    setTool('pen')
    setInCanvas(false)

    // IndexedDB에서 이전 작업 복원
    indexedDB
      .loadFromIndexedDB()
      .then((restored) => {
        if (restored) {
          kToast.success('이전 작업을 복원했습니다')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {/* IndexedDB 로딩 중일 때 스켈레톤 표시 */}
      {isLoading && (
        <div
          className="w-4/5 rounded-2xl flex justify-center items-center overflow-hidden"
          style={{ height: 'calc(100dvh * 0.4)' }}
        >
          <KSpinner size="xl" />
        </div>
      )}

      {/* 로딩 완료 후 DropArea 표시 */}
      {!isLoading && <DropArea isRender={!isImg} paintImage={paintImage} />}

      {/* Toolbox는 이미지가 있을 때만 표시 */}
      <Toolbox
        isRender={isImg}
        reset={resetCanvas}
        undo={undoCanvas}
        recovery={recoveryCanvas}
        download={downCanvas}
        copy={copyCanvas}
      />

      {/* Canvas는 항상 렌더링 (ref가 필요하므로) */}
      <canvas
        ref={canvasRef}
        width="0"
        height="0"
        onMouseDown={handleMouseDown}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawCursor}
        onMouseEnter={onMouseEnter}
        className={`
          overflow-hidden select-none cursor-none
          shadow-[0px_19px_38px_rgba(0,0,0,0.3),0px_15px_12px_rgba(0,0,0,0.22)]
          transition-opacity duration-75 ease-in-out
          ${tool === 'crop' ? 'invisible' : ''}
          ${isLoading ? 'hidden' : ''}
        `}
      />
      <Crop currentImage={currentImage.current} tool={tool} cropConfig={cropConfig} />
    </>
  )
}

export default Canvas

import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas, paintImageInCanvas, drawCanvas, dataUrlDrawInCanvas, downloadImage } from '@/utils/canvas'
import CanvasStyled from './style'
import DropArea from '@/components/DropArea'
import Toolbox from '@/components/Toolbox'
import Crop from '@/components/Crop'
import { useBearStore } from '@/zustand/store'
import { type ICanvasData } from '@/utils/canvas'

const Canvas = () => {
  const { color, thick, tool, setTool } = useBearStore((state) => state) // 현재 색상
  const [isImg, setImg] = useState(false) // 캔버스에 이미지 표시 여부, false인 경우 <DropArea /> 표시

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originImage = useRef<ICanvasData | null>(null)
  const canvasHistory = useRef<ICanvasData[]>([])
  const currentIndex = useRef<number>(0) // 드로윙 위치, canvasHistory에 사용
  const currentImage = useRef<string>('')

  // 드로잉 변수
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  // 캔버스 가져오기
  const getCanvas = useCallback(() => {
    if (!canvasRef.current) throw new Error('Canvas is not available.')
    return canvasRef.current
  }, [])

  // 캔버스 컨텍스트 가져오기
  const getCtx = useCallback(() => {
    const ctx = getCanvas()?.getContext('2d')
    if (!ctx) throw new Error('Canvas context is not available.')
    ctx.imageSmoothingQuality = 'high'
    return ctx
  }, [])

  // 현재 이미지 저장
  const saveCurrentImage = useCallback(() => {
    setTimeout(() => {
      const canvas = getCanvas()
      const tempImg = canvas.toDataURL('image/jpeg', 1)
      currentImage.current = tempImg
    }, 300)
  }, [])

  // 메타 데이터 초기화
  const resetData = useCallback(() => {
    originImage.current = null
    canvasHistory.current.splice(0)
    currentIndex.current = 0
  }, [])

  // 캔버스 복사 기능
  const copyCanvas = useCallback(() => {
    const canvas = getCanvas()
    copyImageInCanvas(canvas)
    canvas.classList.add('copy-done')
    setTimeout(() => {
      canvas.classList.remove('copy-done')
    }, 220)
  }, [])

  // 캔버스에 초기화
  const resetCanvas = useCallback(() => {
    const canvas = getCanvas()
    const ctx = getCtx()

    ctx.clearRect(0, 0, 0, 0) // 캔버스 초기화
    ctx.beginPath()
    canvas.width = 0
    canvas.height = 0

    resetData() // 메타 데이터 초기화
    setTool('pen') // 툴 초기화
    setImg(false)
  }, [])

  // 이전 작업 캔버스 복구용 변수에 저장
  const recoverSaveCanvas = useCallback(() => {
    const canvas = getCanvas()

    const canvasData = {
      base64: canvas.toDataURL('image/jpeg', 1),
      width: canvas.width,
      height: canvas.height,
    }

    if (currentIndex.current === 0) originImage.current = canvasData
    canvasHistory.current.push(canvasData)
    currentIndex.current += 1
  }, [])

  // 캔버스 이전으로 되돌리기
  const undoCanvas = useCallback(() => {
    const canvas = getCanvas()

    if (currentIndex.current === 0) return
    if (tool === 'crop') setTool(null)
    const undoIdx = currentIndex.current - 1
    const undoImageUrl = canvasHistory.current[undoIdx]
    currentImage.current = undoImageUrl.base64 // 전 단계 이미지 현재 이미지에 저장
    dataUrlDrawInCanvas(canvas, undoImageUrl) // 전 단계 이미지 캔버스에 그리기
    currentIndex.current = undoIdx
    canvasHistory.current.splice(canvasHistory.current.length - 1, 1) // 마지막 기록 삭제
  }, [])

  // 초기 이미지로 복구
  const recoveryCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (originImage.current === null) return

    if (tool === 'crop') setTool(null)

    canvasHistory.current.push({
      base64: canvas.toDataURL('image/jpeg', 1),
      width: canvas.width,
      height: canvas.height,
    })
    currentIndex.current += 1
    dataUrlDrawInCanvas(canvas, originImage.current)
  }, [])

  // 캔버스 이미지 다운로드
  const downCanvas = useCallback((e?: KeyboardEvent) => {
    e?.preventDefault()
    const canvas = getCanvas()
    downloadImage(canvas)
  }, [])

  // 캔버스 클립보드 이미지 붙여넣기
  const pasteCanvas = useCallback(() => {
    const canvas = getCanvas()
    pasteImageInCanvas(canvas, () => {
      resetData() // 메타 데이터 초기화
      setImg(true)
    })
    saveCurrentImage()
  }, [])

  // 캔버스에 이미지 넣기
  const paintImage = (imageFile: File) => {
    const canvas = getCanvas()
    paintImageInCanvas(canvas, imageFile)
    setImg(true)
    saveCurrentImage()
  }

  // 펜 그리기 시작
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (tool !== 'pen') return
    const ctx = getCtx()

    recoverSaveCanvas()
    setIsDrawing(true)
    setLastX(e.nativeEvent.offsetX)
    setLastY(e.nativeEvent.offsetY)

    ctx.lineCap = 'round'
    ctx.lineWidth = thick
    ctx.strokeStyle = color // 색상 적용
  }

  // 펜 그리는 중
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return

    const canvas = getCanvas()
    const moveToXY = { x: lastX, y: lastY }
    const lineToXY = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    drawCanvas(canvas, moveToXY, lineToXY)

    setLastX(e.nativeEvent.offsetX)
    setLastY(e.nativeEvent.offsetY)
  }

  // 펜 그리기 종료
  const endDrawing = () => {
    setIsDrawing(false)
    saveCurrentImage()
  }

  // Crop된 이미지 적용
  const cropConfig = useCallback((cropData: ICanvasData) => {
    const canvas = getCanvas()

    // 자르기 전 이미지 백업
    recoverSaveCanvas()
    // 자른 이미지 캔버스에 그리기
    dataUrlDrawInCanvas(canvas, cropData)
  }, [])

  const keyCheck = useCallback((e: KeyboardEvent) => {
    // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') pasteCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 'c') copyCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 'z') undoCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 's') downCanvas(e)
  }, [])

  useEffect(() => {
    setTool('pen')
    window.addEventListener('keydown', keyCheck)
    return () => {
      window.removeEventListener('keydown', keyCheck)
    }
  }, [])

  return (
    <>
      <DropArea isRender={!isImg} paintImage={paintImage} />
      <Toolbox isRender={isImg} reset={resetCanvas} undo={undoCanvas} recovery={recoveryCanvas} download={downCanvas} copy={copyCanvas} />
      <CanvasStyled ref={canvasRef} width="0" height="0" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseOut={endDrawing} isVis={tool === 'crop' ? 0 : 1} />
      <Crop currentImage={currentImage.current} tool={tool} cropConfig={cropConfig} />
    </>
  )
}

export default Canvas

import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas, paintImageInCanvas, drawCanvas, undoImageInCanvas, downloadImage } from '@/utils/canvas'
import CanvasStyled from './style'
import DropArea from '@/components/DropArea'
import Toolbar from '@/components/Toolbar'
import { useBearStore } from '@/zustand/store'

const canvasHistory: string[] = []

const Canvas = () => {
  const { color, thick, tool, setTool } = useBearStore((state) => state) // 현재 색상
  const [isImg, setImg] = useState(false) // 캔버스에 이미지 표시 여부, false인 경우 <DropArea /> 표시

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentIndex = useRef<number>(0) // 드로윙 위치, canvasHistory에 사용

  // 드로잉 변수
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  // 캔버스 가져오기
  const getCanvas = useCallback(() => {
    if (canvasRef.current === null) {
      console.error('not found canvas!')
      return
    }
    return canvasRef.current
  }, [])

  // 캔버스 컨텍스트 가져오기
  const getCtx = useCallback(() => {
    const ctx = getCanvas()?.getContext('2d')
    if (!ctx) {
      console.error('ctx is null')
      return
    }
    return ctx
  }, [])

  // 캔버스 복사 기능
  const copyCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (!canvas) return
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
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, 0, 0) // 캔버스 초기화
    ctx.beginPath()
    canvas.width = 0
    canvas.height = 0

    currentIndex.current = 0 // 순서 초기화
    canvasHistory.splice(0) // 백업 데이터 초기화
    setImg(false)
  }, [])

  // 이전 작업 캔버스 복구용 변수에 저장
  const recoverSaveCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (!canvas) return
    const tempImg = canvas.toDataURL('image/jpeg', 1)
    canvasHistory.push(tempImg)
    currentIndex.current += 1
  }, [])

  // 캔버스 이전으로 되돌리기
  const undoCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (!canvas) return
    if (currentIndex.current === 0) return
    const undoIdx = currentIndex.current - 1
    undoImageInCanvas(canvas, canvasHistory[undoIdx])
    currentIndex.current = undoIdx
    canvasHistory.splice(canvasHistory.length - 1, 1) // 마지막 기록 삭제
  }, [])

  // 캔버스 이미지 다운로드
  const downCanvas = useCallback((e?: KeyboardEvent) => {
    e?.preventDefault()
    const canvas = getCanvas()
    if (!canvas) return
    downloadImage(canvas)
  }, [])

  // 캔버스 클립보드 이미지 붙여넣기
  const pasteCanvas = useCallback(() => {
    const canvas = getCanvas()
    if (!canvas) return
    pasteImageInCanvas(canvas, () => {
      setImg(true)
    })
    setTool('pen') // 기본 툴 설정
  }, [])

  // 캔버스에 이미지 넣기
  const paintImage = (imageFile: File) => {
    const canvas = getCanvas()
    if (!canvas) return
    paintImageInCanvas(canvas, imageFile)
    setTool('pen') // 기본 툴 설정
    setImg(true)
  }

  // 펜 그리기 시작
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = getCtx()
    if (!ctx || tool !== 'pen') return

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
    const canvas = getCanvas()
    const ctx = getCtx()
    if (!isDrawing || !ctx || !canvas) return

    const moveToXY = { x: lastX, y: lastY }
    const lineToXY = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    drawCanvas(canvas, moveToXY, lineToXY)

    setLastX(e.nativeEvent.offsetX)
    setLastY(e.nativeEvent.offsetY)
  }

  // 펜 그리기 종료
  const endDrawing = () => {
    setIsDrawing(false)
  }

  // 캔버스 이전으로 되돌리기
  // const redoCanvas = () => {
  //   if (canvasRef.current === null) return
  //   if (currentIndex.current === 0) return
  //   const redoIdx = currentIndex.current + 1
  //   undoImageInCanvas(canvasRef.current, canvasHistory[redoIdx])
  //   currentIndex.current = redoIdx
  // }

  const keyCheck = useCallback((e: KeyboardEvent) => {
    // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') pasteCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 'c') copyCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 'z') undoCanvas()
    else if ((e.ctrlKey || e.metaKey) && e.key === 's') downCanvas(e)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', keyCheck)
    return () => {
      window.removeEventListener('keydown', keyCheck)
    }
  }, [])

  return (
    <>
      <Toolbar isRender={isImg} reset={resetCanvas} undo={undoCanvas} download={downCanvas} copy={copyCanvas} />
      <DropArea isRender={!isImg} paintImage={paintImage} />
      <CanvasStyled ref={canvasRef} width="0" height="0" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseOut={endDrawing} />
    </>
  )
}

export default Canvas

import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas, paintImageInCanvas, drawCanvas, undoImageInCanvas, downloadImage } from '@/utils/canvas'
import CanvasStyled from './style'
import DropArea from '@/components/DropArea'
import Toolbar from '@/components/Toolbar'
import { useBearStore } from '@/zustand/store'

const canvasHistory: string[] = []

const Canvas = () => {
  const { color, thick, tool } = useBearStore((state) => state) // 현재 색상
  const [isImg, setImg] = useState(false) // 캔버스에 이미지 표시 여부, false인 경우 <DropArea /> 표시

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentIndex = useRef<number>(0) // 드로윙 위치, canvasHistory에 사용

  // Drawing 변수
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  // 현재 상태 초기화
  const clearIndex = useCallback(() => {
    currentIndex.current = 0
  }, [])

  // 캔버스 복사 기능
  const copyCanvas = () => {
    if (!canvasRef.current) return
    copyImageInCanvas(canvasRef.current)
    canvasRef.current?.classList.add('copy-done')
    setTimeout(() => {
      canvasRef.current?.classList.remove('copy-done')
    }, 220)
  }

  // 이전 작업 캔버스 복구용 변수에 저장
  const recoverSaveCanvas = useCallback(() => {
    if (canvasRef.current === null) return
    const tempImg = canvasRef.current?.toDataURL('image/jpeg', 1)
    canvasHistory.push(tempImg)
    currentIndex.current += 1
  }, [])

  // 캔버스 이전으로 되돌리기
  const undoCanvas = useCallback(() => {
    if (canvasRef.current === null) return
    if (currentIndex.current === 0) return
    const undoIdx = currentIndex.current - 1
    undoImageInCanvas(canvasRef.current, canvasHistory[undoIdx])
    currentIndex.current = undoIdx
    canvasHistory.splice(canvasHistory.length - 1, 1) // 마지막 기록 삭제
  }, [])

  // 캔버스 이미지 다운로드
  const downCanvas = useCallback((e?: KeyboardEvent) => {
    e?.preventDefault()
    if (canvasRef.current === null) return
    downloadImage(canvasRef.current)
  }, [])

  const pasteCanvas = useCallback(() => {
    if (canvasRef.current === null) return
    pasteImageInCanvas(canvasRef.current, () => {
      setImg(true)
    })
    clearIndex()
  }, [])

  // 캔버스에 이미지 넣기
  const paintImage = (imageFile: File) => {
    if (canvasRef.current === null) return
    paintImageInCanvas(canvasRef.current, imageFile)
    setImg(true)
  }

  // 펜 그리기 시작
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current || tool !== 'pen') return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

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
    if (!isDrawing || canvasRef.current === null) return
    const ctx = canvasRef.current.getContext('2d')
    if (ctx === null) return

    const moveToXY = { x: lastX, y: lastY }
    const lineToXY = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    drawCanvas(canvasRef.current, moveToXY, lineToXY)

    setLastX(e.nativeEvent.offsetX)
    setLastY(e.nativeEvent.offsetY)
  }

  // 펜 그리기 종료
  const endDrawing = () => {
    setIsDrawing(false)
  }

  // 캔버스에 이미지 초기화
  const resetCanvas = useCallback(() => {
    if (canvasRef.current === null) return
    const ctx = canvasRef.current.getContext('2d')
    if (ctx === null) {
      console.error('ctx is null')
      return
    }
    ctx.clearRect(0, 0, 0, 0) // 캔버스 초기화
    ctx.beginPath()
    canvasRef.current.width = 0
    canvasRef.current.height = 0
    clearIndex()
    setImg(false)
  }, [])

  // 캔버스 이전으로 되돌리기
  // const redoCanvas = () => {
  //   if (canvasRef.current === null) return
  //   if (currentIndex.current === 0) return
  //   const redoIdx = currentIndex.current + 1
  //   undoImageInCanvas(canvasRef.current, canvasHistory[redoIdx])
  //   currentIndex.current = redoIdx
  // }

  // 클립보드에 있는 이미지 붙여넣기
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

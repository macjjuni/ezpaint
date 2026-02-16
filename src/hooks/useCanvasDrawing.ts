import { useRef, useCallback } from 'react'
import { drawCanvas, drawPoint } from '@/utils/canvas'

interface UseCanvasDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  color: string
  thick: number
  saveCurrentImage: () => void
  recoverSaveCanvas: () => void
  saveToIndexedDB: () => Promise<void>
  setInCanvas: (inCanvas: boolean) => void
}

/**
 * 캔버스 드로잉 상호작용 관리 커스텀 훅
 */
export const useCanvasDrawing = ({
  canvasRef,
  color,
  thick,
  saveCurrentImage,
  recoverSaveCanvas,
  saveToIndexedDB,
  setInCanvas,
}: UseCanvasDrawingProps) => {
  const isDrawingRef = useRef(false)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)

  /**
   * 캔버스 컨텍스트 가져오기
   */
  const getCtx = () => {
    const canvas = canvasRef.current
    if (!canvas) throw new Error('Canvas is not available.')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context is not available.')
    ctx.imageSmoothingQuality = 'high'
    return ctx
  }

  /**
   * 드로잉 시작
   */
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = getCtx()
    const pos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }

    recoverSaveCanvas()
    isDrawingRef.current = true // 드로잉 시작

    lastXRef.current = pos.x
    lastYRef.current = pos.y

    drawPoint(ctx, pos, color, thick)
    ctx.lineCap = 'round' // 스타일
    ctx.lineWidth = thick // 두께 적용
    ctx.strokeStyle = color // 색상 적용
  }, [color, thick, recoverSaveCanvas])

  /**
   * 드로잉 중
   */
  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawingRef.current) return

    const ctx = getCtx()
    const moveToXY = { x: lastXRef.current, y: lastYRef.current }
    const lineToXY = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    drawCanvas(ctx, moveToXY, lineToXY)

    lastXRef.current = e.nativeEvent.offsetX
    lastYRef.current = e.nativeEvent.offsetY
  }, [])

  /**
   * 드로잉 종료
   */
  const endDrawing = useCallback(() => {
    isDrawingRef.current = false
    saveCurrentImage()

    // IndexedDB에 저장
    void saveToIndexedDB().catch((err) => {
      console.error('Failed to save to IndexedDB:', err)
    })
  }, [saveCurrentImage, saveToIndexedDB])

  /**
   * 캔버스를 벗어났을 때 드로잉 종료
   */
  const endDrawCursor = useCallback(() => {
    // 그리기 중이었다면 그리기 종료 처리
    if (isDrawingRef.current) {
      isDrawingRef.current = false
      saveCurrentImage()
      void saveToIndexedDB().catch((err) => {
        console.error('Failed to save to IndexedDB:', err)
      })
    }
    setInCanvas(false)
  }, [saveCurrentImage, saveToIndexedDB, setInCanvas])

  return {
    startDrawing,
    draw,
    endDrawing,
    endDrawCursor,
  }
}

import { useRef, useCallback } from 'react'
import { type ICanvasData } from '@/utils/canvas'
import { dataUrlDrawInCanvas } from '@/utils/canvas'
import { type ToolType } from '@/store/store'

interface UseCanvasHistoryProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  saveToIndexedDB: () => Promise<void>
  tool: ToolType
  setTool: (tool: ToolType) => void
}

/**
 * 캔버스 히스토리 및 실행 취소/복원 관리 커스텀 훅
 */
export const useCanvasHistory = ({
  canvasRef,
  saveToIndexedDB,
  tool,
  setTool,
}: UseCanvasHistoryProps) => {
  const canvasHistory = useRef<ICanvasData[]>([])
  const currentIndex = useRef<number>(0)
  const originImage = useRef<ICanvasData | null>(null)
  const currentImage = useRef<string>('')

  /**
   * 현재 캔버스 상태를 이미지로 저장
   */
  const saveCurrentImage = useCallback(() => {
    requestAnimationFrame(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      if (canvas.width === 0) return

      currentImage.current = canvas.toDataURL('image/jpeg', 1)
    })
  }, [])

  /**
   * 메타 데이터 초기화
   */
  const resetData = useCallback(() => {
    originImage.current = null
    canvasHistory.current.splice(0)
    currentIndex.current = 0
  }, [])

  /**
   * 현재 캔버스를 히스토리에 저장하고 IndexedDB에 백업
   */
  const recoverSaveCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const canvasData = {
      base64: canvas.toDataURL('image/jpeg', 1),
      width: canvas.width,
      height: canvas.height,
    }

    if (currentIndex.current === 0) originImage.current = canvasData
    canvasHistory.current.push(canvasData)
    currentIndex.current += 1

    // IndexedDB에 저장
    void saveToIndexedDB()
  }, [saveToIndexedDB])

  /**
   * 캔버스를 이전 상태로 되돌리기 (Undo)
   */
  const undoCanvas = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (currentIndex.current === 0) return
    if (tool === 'crop') setTool('pen')
    const undoIdx = currentIndex.current - 1
    const undoImageUrl = canvasHistory.current[undoIdx]

    if (!undoImageUrl) {
      console.warn('Undo 이미지를 찾을 수 없습니다')
      return
    }

    currentImage.current = undoImageUrl.base64 // 전 단계 이미지 현재 이미지에 저장

    // 이미지가 완전히 그려질 때까지 대기
    await dataUrlDrawInCanvas(canvas, undoImageUrl)

    currentIndex.current = undoIdx
    canvasHistory.current.splice(canvasHistory.current.length - 1, 1) // 마지막 기록 삭제

    // 이미지 그려진 후 IndexedDB에 저장
    await saveToIndexedDB()
  }, [tool, setTool, saveToIndexedDB])

  /**
   * 원본 이미지로 복구
   */
  const recoveryCanvas = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (originImage.current === null) return

    if (tool === 'crop') setTool('pen')

    canvasHistory.current.push({
      base64: originImage.current.base64,
      width: originImage.current.width,
      height: originImage.current.height,
    })

    currentIndex.current += 1

    await dataUrlDrawInCanvas(canvas, originImage.current)
    await saveToIndexedDB()
  }, [tool, setTool, saveToIndexedDB])

  return {
    canvasHistory,
    currentIndex,
    originImage,
    currentImage,
    saveCurrentImage,
    resetData,
    recoverSaveCanvas,
    undoCanvas,
    recoveryCanvas,
  }
}

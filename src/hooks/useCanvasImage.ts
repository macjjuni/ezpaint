import { useCallback } from 'react'
import { kToast } from 'kku-ui'
import {
  copyImageInCanvas,
  pasteImageInCanvas,
  drawImageInCanvas,
  downloadImage,
  dataUrlDrawInCanvas,
  type ICanvasData,
} from '@/utils/canvas'
import { type ToolType } from '@/store/store'

interface UseCanvasImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  setImg: (value: boolean) => void
  saveCurrentImage: () => void
  resetData: () => void
  recoverSaveCanvas: () => void
  saveToIndexedDB: () => Promise<void>
  clearIndexedDB: () => Promise<void>
  setTool: (tool: ToolType) => void
  setInCanvas: (inCanvas: boolean) => void
}

/**
 * 캔버스 이미지 작업 관리 커스텀 훅
 */
export const useCanvasImage = ({
  canvasRef,
  setImg,
  saveCurrentImage,
  resetData,
  recoverSaveCanvas,
  saveToIndexedDB,
  clearIndexedDB,
  setTool,
  setInCanvas,
}: UseCanvasImageProps) => {
  /**
   * 캔버스 이미지를 클립보드에 복사
   */
  const copyCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    copyImageInCanvas(canvas)
    kToast.success('복사 완료!')
    canvas.classList.add('copy-done')
    setTimeout(() => {
      canvas.classList.remove('copy-done')
    }, 220)
  }, [])

  /**
   * 클립보드 이미지를 캔버스에 붙여넣기
   */
  const pasteCanvas = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    await pasteImageInCanvas(canvas, () => {
      resetData() // 메타 데이터 초기화
      setImg(true)
    })
    saveCurrentImage()

    // IndexedDB에 저장
    void saveToIndexedDB().catch((err) => {
      console.error('Failed to save to IndexedDB:', err)
    })
  }, [resetData, setImg, saveCurrentImage, saveToIndexedDB])

  /**
   * 이미지 파일을 캔버스에 그리기
   */
  const paintImage = useCallback(async (imageFile: File) => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      await drawImageInCanvas(canvas, imageFile)
      setImg(true)
      saveCurrentImage()

      // IndexedDB에 저장
      await saveToIndexedDB()
    } catch (err) {
      console.error('이미지 로드 실패:', err)
      kToast.error('이미지를 불러올 수 없습니다.')
    }
  }, [setImg, saveCurrentImage, saveToIndexedDB])

  /**
   * 캔버스 이미지 다운로드
   */
  const downCanvas = useCallback((e?: KeyboardEvent) => {
    e?.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    downloadImage(canvas)
  }, [])

  /**
   * 캔버스 초기화
   */
  const resetCanvas = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 0, 0) // 캔버스 초기화
    ctx.beginPath()
    canvas.width = 0
    canvas.height = 0

    resetData() // 메타 데이터 초기화
    setTool('pen') // 툴 초기화
    setInCanvas(false)
    setImg(false)

    // IndexedDB 데이터 삭제 완료까지 대기
    await clearIndexedDB()
  }, [resetData, setTool, setInCanvas, setImg, clearIndexedDB])

  /**
   * 크롭 적용
   */
  const cropConfig = useCallback(async (cropData: ICanvasData) => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 자르기 전 이미지 백업
    recoverSaveCanvas()

    // 자른 이미지가 완전히 그려질 때까지 대기
    await dataUrlDrawInCanvas(canvas, cropData)

    // 이미지 그려진 후 IndexedDB에 저장
    await saveToIndexedDB()
  }, [recoverSaveCanvas, saveToIndexedDB])

  return {
    copyCanvas,
    pasteCanvas,
    paintImage,
    downCanvas,
    resetCanvas,
    cropConfig,
  }
}

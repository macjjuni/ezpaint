import { MutableRefObject } from 'react'
import { set, get, del } from 'idb-keyval'
import { IDB_KEYS } from '@/constants'
import { type ICanvasData } from '@/utils/canvas'
import { drawImageInCanvas } from '@/utils/canvas'

interface UseCanvasIndexedDBProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  canvasHistory: MutableRefObject<ICanvasData[]>
  currentIndex: MutableRefObject<number>
  originImage: MutableRefObject<ICanvasData | null>
  setImg: (value: boolean) => void
  saveCurrentImage: () => void
}

/**
 * IndexedDB에 캔버스 상태를 저장/로드/삭제하는 커스텀 훅
 */
export const useCanvasIndexedDB = ({
  canvasRef,
  canvasHistory,
  currentIndex,
  originImage,
  setImg,
  saveCurrentImage,
}: UseCanvasIndexedDBProps) => {
  /**
   * 캔버스와 메타데이터를 IndexedDB에 저장
   */
  const saveToIndexedDB = async () => {
    try {
      const canvas = canvasRef.current
      if (!canvas) throw new Error('Canvas is not available.')

      if (canvas.width === 0 || canvas.height === 0) {
        return
      }

      // 캔버스를 Blob으로 변환
      const blob: Blob | null = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1)
      })

      if (!blob || blob.size === 0) return

      // 모든 데이터 저장
      await Promise.all([
        set(IDB_KEYS.CURRENT_CANVAS, blob),
        set(IDB_KEYS.CANVAS_HISTORY, canvasHistory.current),
        set(IDB_KEYS.CANVAS_INDEX, currentIndex.current),
        set(IDB_KEYS.ORIGIN_IMAGE, originImage.current),
      ])
    } catch (err) {
      console.error('IndexedDB 저장 실패:', err)
    }
  }

  /**
   * IndexedDB에서 캔버스와 메타데이터 복원
   *
   * @returns 복원 성공 여부
   */
  const loadFromIndexedDB = async (): Promise<boolean> => {
    try {
      const blob = await get<Blob>(IDB_KEYS.CURRENT_CANVAS)

      // blob이 없거나 크기가 0이면 손상된 데이터
      if (!blob || blob.size === 0) {
        // 손상된 데이터 정리
        await clearIndexedDB()
        return false
      }

      const canvas = canvasRef.current
      if (!canvas) throw new Error('Canvas is not available.')

      await drawImageInCanvas(canvas, blob)

      // 히스토리 및 메타데이터 복원
      const history = await get<ICanvasData[]>(IDB_KEYS.CANVAS_HISTORY)
      const index = await get<number>(IDB_KEYS.CANVAS_INDEX)
      const origin = await get<ICanvasData>(IDB_KEYS.ORIGIN_IMAGE)

      if (history) canvasHistory.current = history
      if (typeof index === 'number') currentIndex.current = index
      if (origin) originImage.current = origin

      setImg(true)
      saveCurrentImage()

      return true
    } catch (err) {
      console.error('IndexedDB 로드 실패:', err)
      // 에러 발생 시 손상된 데이터 정리
      await clearIndexedDB()
      return false
    }
  }

  /**
   * IndexedDB의 모든 캔버스 데이터 삭제
   */
  const clearIndexedDB = async () => {
    try {
      await Promise.all([
        del(IDB_KEYS.CURRENT_CANVAS),
        del(IDB_KEYS.CANVAS_HISTORY),
        del(IDB_KEYS.CANVAS_INDEX),
        del(IDB_KEYS.ORIGIN_IMAGE),
      ])
    } catch (err) {
      console.error('IndexedDB 삭제 실패:', err)
    }
  }

  return {
    saveToIndexedDB,
    loadFromIndexedDB,
    clearIndexedDB,
  }
}

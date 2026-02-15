import { useEffect } from 'react'

interface UseCanvasKeyboardProps {
  pasteCanvas: () => Promise<void>
  copyCanvas: () => void
  undoCanvas: () => Promise<void>
  downCanvas: (e?: KeyboardEvent) => void
  resetCanvas: () => Promise<void>
}

/**
 * 캔버스 키보드 단축키 관리 커스텀 훅
 *
 * - Ctrl+C: 복사
 * - Ctrl+V: 붙여넣기
 * - Ctrl+Z: 실행 취소
 * - Ctrl+S: 다운로드
 * - Ctrl+R: 초기화
 */
export const useCanvasKeyboard = ({
  pasteCanvas,
  copyCanvas,
  undoCanvas,
  downCanvas,
  resetCanvas,
}: UseCanvasKeyboardProps) => {
  useEffect(() => {
    const keyCheck = async (e: KeyboardEvent) => {
      // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') await pasteCanvas()
      else if ((e.ctrlKey || e.metaKey) && e.key === 'c') copyCanvas()
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z') await undoCanvas()
      else if ((e.ctrlKey || e.metaKey) && e.key === 's') downCanvas(e)
      else if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault() // 브라우저 새로고침 방지
        await resetCanvas()
      }
    }

    window.addEventListener('keydown', keyCheck)
    return () => window.removeEventListener('keydown', keyCheck)
  }, [pasteCanvas, copyCanvas, undoCanvas, downCanvas, resetCanvas])
}

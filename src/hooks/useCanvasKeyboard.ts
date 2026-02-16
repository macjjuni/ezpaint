import { useEffect } from 'react'

interface UseCanvasKeyboardProps {
  pasteCanvas: () => Promise<void>
  copyCanvas: () => void
  undoCanvas: () => Promise<void>
  downCanvas: (e?: KeyboardEvent) => void
  resetCanvas: () => Promise<void>
  recoveryCanvas: () => Promise<void>
  thick: number
  setThick: (thick: number) => void
}

/**
 * 캔버스 키보드 단축키 관리 커스텀 훅
 *
 * - Ctrl+C: 복사
 * - Ctrl+V: 붙여넣기
 * - Ctrl+Z: 실행 취소
 * - Ctrl+S: 다운로드
 * - Ctrl+R: 휴지통 (전체 초기화)
 * - Ctrl+F: 초기화 (원본 복구)
 * - Ctrl++: 두께 증가
 * - Ctrl+-: 두께 감소
 */
export const useCanvasKeyboard = ({
  pasteCanvas,
  copyCanvas,
  undoCanvas,
  downCanvas,
  resetCanvas,
  recoveryCanvas,
  thick,
  setThick,
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
      else if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault() // 브라우저 찾기 기능 방지
        await recoveryCanvas()
      }
      // 두께 증가 (Ctrl + +/=)
      else if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault() // 브라우저 확대 방지
        if (thick < 25) {
          setThick(thick + 1)
        }
      }
      // 두께 감소 (Ctrl + -)
      else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault() // 브라우저 축소 방지
        if (thick > 1) {
          setThick(thick - 1)
        }
      }
    }

    window.addEventListener('keydown', keyCheck)
    return () => window.removeEventListener('keydown', keyCheck)
  }, [pasteCanvas, copyCanvas, undoCanvas, downCanvas, resetCanvas, recoveryCanvas, thick, setThick])
}

import { useEffect, useRef } from 'react'
import { pasteImageInCanvas, copyImageInCanvas } from '@/utils/canvas'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pasteCheck = (e: KeyboardEvent) => {
    // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      if (!canvasRef.current) return
      pasteImageInCanvas(canvasRef.current)
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      if (!canvasRef.current) return
      copyImageInCanvas(canvasRef.current)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', pasteCheck)
    return () => {
      window.removeEventListener('keydown', pasteCheck)
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default Canvas

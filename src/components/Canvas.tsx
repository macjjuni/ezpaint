import styled from '@emotion/styled'
import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas } from '@/utils/canvas'

const CanvasStyled = styled.canvas<{ display?: 'block' | 'none' }>`
  display: ${(props) => props.display || 'block'};
`

const Canvas = () => {
  const [isImg, setImg] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imageRender = useCallback(() => {
    setImg(true)
  }, [])

  const pasteCheck = (e: KeyboardEvent) => {
    // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      if (!canvasRef.current) return
      pasteImageInCanvas(canvasRef.current, imageRender)
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

  return (
    <>
      <CanvasStyled ref={canvasRef} display={isImg ? 'block' : 'none'} />
      {!isImg && 'Paste...'}
    </>
  )
}

export default Canvas

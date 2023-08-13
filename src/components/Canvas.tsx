import styled from '@emotion/styled'
import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas, paintImageInCanvas } from '@/utils/canvas'
import DropArea from '@/DropArea'

const CanvasStyled = styled.canvas<{ display?: 'block' | 'none' }>`
  display: ${(props) => props.display || 'block'};
`

const Canvas = () => {
  const [isImg, setImg] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imageRender = useCallback(() => {
    setImg(true)
  }, [])

  const pasteCheck = useCallback((e: KeyboardEvent) => {
    // Ctrl || Command 키 + 'v' 키 다운 이벤트 감지해서 이미지 붙어넣기
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      if (!canvasRef.current) return
      pasteImageInCanvas(canvasRef.current, imageRender)
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      if (!canvasRef.current) return
      copyImageInCanvas(canvasRef.current)
    }
  }, [])

  const paintImage = (imageFile: File) => {
    if (!canvasRef.current) return
    paintImageInCanvas(canvasRef.current, imageFile)
    setImg(true)
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
      {!isImg && <DropArea paintImage={paintImage} />}
    </>
  )
}

export default Canvas

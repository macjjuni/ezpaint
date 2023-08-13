import { useEffect, useRef, useState, useCallback } from 'react'
import { pasteImageInCanvas, copyImageInCanvas, paintImageInCanvas } from '@/utils/canvas'
import CanvasStyled from './style'
import DropArea from '@/components/DropArea'
import Toolbar from '@/components/Toolbar'

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

  const resetCanvas = useCallback(() => {
    if (canvasRef.current === null) return
    const ctx = canvasRef.current.getContext('2d')
    if (ctx === null) {
      console.error('ctx is null')
      return
    }
    ctx.clearRect(0, 0, 0, 0)
    ctx.beginPath()
    canvasRef.current.width = 0
    canvasRef.current.height = 0
    setImg(false)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', pasteCheck)
    return () => {
      window.removeEventListener('keydown', pasteCheck)
    }
  }, [])

  return (
    <>
      <Toolbar isRender={isImg} resetCanvas={resetCanvas} />
      <DropArea isRender={!isImg} paintImage={paintImage} />
      <CanvasStyled ref={canvasRef} width="0" height="0" />
    </>
  )
}

export default Canvas

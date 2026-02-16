import { useEffect, useState } from 'react'
import { useThick, useColor, useInCanvas, useTool } from '@/store/store'

const DrawCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const thick = useThick()
  const color = useColor()
  const inCanvas = useInCanvas()
  const tool = useTool()

  const mouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    // 커서를 중앙 정렬: 두께의 절반만큼 오프셋
    setPos({ x: clientX - thick / 2, y: clientY - thick / 2 })
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', mouseMove)
  }, [thick])

  const isVisible = inCanvas && tool === 'pen'

  return (
    <div
      className="absolute rounded-full pointer-events-none z-[9999]"
      style={{
        display: isVisible ? 'block' : 'none',
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${thick}px`,
        height: `${thick}px`,
        backgroundColor: color,
      }}
    />
  )
}

export default DrawCursor

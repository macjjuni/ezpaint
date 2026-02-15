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
    setPos({ x: clientX - 5, y: clientY - 5 })
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', mouseMove)
  }, [])

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

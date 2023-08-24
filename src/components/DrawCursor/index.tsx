import { useEffect, useState } from 'react'
import DrawCursorStyled from './style'
import { useBearStore } from '@/zustand/store'

const DrawCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const { thick, color, inCanvas, tool } = useBearStore((state) => state)

  const mouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    setPos({ x: clientX - 5, y: clientY - 5 })
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', mouseMove)
  }, [])
  return <DrawCursorStyled inCanvas={inCanvas && tool === 'pen'} x={pos.x} y={pos.y} color={color} thick={thick} />
}

export default DrawCursor

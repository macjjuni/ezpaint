import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ToolType = null | 'picker' | 'thick' | 'pen' | 'crop'

interface BearState {
  tool: ToolType
  color: string
  thick: number
  setColor: (color: string) => void
  setThick: (thick: number) => void
  setTool: (tool: ToolType) => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        tool: null,
        color: 'red',
        thick: 1,
        setColor: (color) => set(() => ({ color })),
        setThick: (thick) => set(() => ({ thick })),
        setTool: (tool) => set(() => ({ tool })),
      }),
      {
        name: 'ezPaint', // persist key
      }
    )
  )
)

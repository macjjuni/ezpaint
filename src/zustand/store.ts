import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type ToolType = null | 'picker' | 'thick' | 'pen' | 'crop'

interface BearState {
  tool: ToolType
  color: string
  thick: number
  inCanvas: boolean
  setColor: (color: string) => void
  setThick: (thick: number) => void
  setTool: (tool: ToolType) => void
  setInCanvas: (bool: boolean) => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        tool: null,
        color: 'red',
        thick: 1,
        inCanvas: false,
        setColor: (color) => set(() => ({ color })),
        setThick: (thick) => set(() => ({ thick })),
        setTool: (tool) => set(() => ({ tool })),
        setInCanvas: (bool) => set(() => ({ inCanvas: bool })),
      }),
      {
        name: 'ezPaint', // persist key
      }
    )
  )
)

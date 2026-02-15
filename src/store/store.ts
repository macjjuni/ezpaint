import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type ToolType } from '@/types'

export type { ToolType } from '@/types'

interface StoreType {
  tool: ToolType
  color: string
  thick: number
  inCanvas: boolean
  setColor: (color: string) => void
  setThick: (thick: number) => void
  setTool: (tool: ToolType) => void
  setInCanvas: (bool: boolean) => void
}

export const useStore = create<StoreType>()(
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

// Granular selectors for optimized re-renders
export const useColor = () => useStore((state) => state.color)
export const useSetColor = () => useStore((state) => state.setColor)
export const useThick = () => useStore((state) => state.thick)
export const useSetThick = () => useStore((state) => state.setThick)
export const useTool = () => useStore((state) => state.tool)
export const useSetTool = () => useStore((state) => state.setTool)
export const useInCanvas = () => useStore((state) => state.inCanvas)
export const useSetInCanvas = () => useStore((state) => state.setInCanvas)

// Composite selectors
export const useDrawingState = () => useStore((state) => ({
  color: state.color,
  thick: state.thick,
  tool: state.tool
}))

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  bears: number
  color: string
  setColor: (color: string) => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        color: 'red',
        setColor: (color) => set(() => ({ color })),
      }),
      {
        name: 'ezPaint', // persist key
      }
    )
  )
)

export interface ICanvasData {
  base64: string
  width: number
  height: number
}

export interface IXY {
  x: number
  y: number
}

export type ToolType = null | 'picker' | 'thick' | 'pen' | 'crop'

export interface ICanvasState {
  tool: ToolType
  color: string
  thick: number
  inCanvas: boolean
}

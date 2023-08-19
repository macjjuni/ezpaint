import { useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import { type ToolType } from '@/zustand/store'

interface ICrop {
  children: React.ReactNode
  tool: ToolType
}

const Crop2 = ({ tool, children }: ICrop) => {
  const [crop, setCrop] = useState<Crop>()

  if (tool !== 'crop') return <>{children}</>

  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      {children}
    </ReactCrop>
  )
}

export default Crop2

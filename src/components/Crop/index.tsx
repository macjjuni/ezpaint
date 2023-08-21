import { useState } from 'react'
import ReactCrop, { type Crop as CropTypes } from 'react-image-crop'
import CropStyled from './style'
import { type ToolType } from '@/zustand/store'

interface ICrop {
  currentImage: string
  tool: ToolType
}

const Crop = ({ currentImage, tool }: ICrop) => {
  const [crop, setCrop] = useState<CropTypes>()

  if (tool === 'crop')
    return (
      <CropStyled.Wrap>
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <CropStyled.Img src={currentImage} alt="canvas crop img" className="crop-image" />
        </ReactCrop>
      </CropStyled.Wrap>
    )
  return <></>
}

export default Crop

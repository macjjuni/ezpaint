import { useState, useRef } from 'react'
import ReactCrop, { type Crop as CropTypes } from 'react-image-crop'
import CropStyled from './style'
import Button from '@/components/Button'
import { useBearStore } from '@/zustand/store'
import { cropImage, type ICanvasData } from '@/utils/canvas'
import { type ToolType } from '@/zustand/store'

interface ICrop {
  currentImage: string
  tool: ToolType
  cropConfig: (imageUrl: ICanvasData) => void
}

const defaultCrop: CropTypes = {
  unit: 'px',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

const Crop = ({ currentImage, tool, cropConfig }: ICrop) => {
  const [crop, setCrop] = useState<CropTypes>({ ...defaultCrop })
  const imgRef = useRef<HTMLImageElement>(null)
  const setTool = useBearStore((state) => state.setTool)

  const onCrop = () => {
    if (!crop || !imgRef.current) return
    if (crop.width <= 100 || crop.height <= 100) {
      console.error('Cut size is too small')
      return
    }
    const cropedImage = cropImage(imgRef.current, crop)
    if (!cropedImage?.base64) {
      console.error('Crop Error!')
      return
    }
    cropConfig(cropedImage) // 자른 이미지 dataURL 전달
    imgRef.current.src = cropedImage.base64
    setCrop({ ...defaultCrop })
    setTool(null)
  }

  if (tool === 'crop')
    return (
      <CropStyled.Wrap>
        <ReactCrop crop={crop} onChange={setCrop}>
          <CropStyled.Img ref={imgRef} src={currentImage} alt="canvas crop img" className="crop-image" />
        </ReactCrop>
        <Button onClick={onCrop} disabled={!(crop.width >= 100 && crop.height >= 100)} fontSize={18} padding="12px 48px">
          ✂️ Crop
        </Button>
      </CropStyled.Wrap>
    )
  return <></>
}

export default Crop

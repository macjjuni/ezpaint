import { useState, useRef, useEffect } from 'react'
import ReactCrop, { type Crop as CropTypes } from 'react-image-crop'
import { KButton } from 'kku-ui'
import { useSetTool } from '@/store/store'
import { cropImage, type ICanvasData } from '@/utils/canvas'
import { type ToolType } from '@/store/store'

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

export default function Crop({ currentImage, tool, cropConfig }: ICrop) {

  const [crop, setCrop] = useState<CropTypes>({ ...defaultCrop })
  const imgRef = useRef<HTMLImageElement>(null)
  const setTool = useSetTool()

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && tool === 'crop') {
        onCrop()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [tool, crop])

  if (tool === 'crop')
    return (
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center gap-4 w-full h-full">
        <KButton className="h-12 w-40 text-xl" variant="primary" size="lg" onClick={onCrop} disabled={!(crop.width >= 100 && crop.height >= 100)}>
          ✂️ Crop
        </KButton>
        <ReactCrop crop={crop} onChange={setCrop}>
          <img ref={imgRef} src={currentImage} alt="canvas crop img" className="crop-image" />
        </ReactCrop>
      </div>
    )
  return <></>
}

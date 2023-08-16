import { useEffect, useState } from 'react'
import CropStyled from './style'

interface ICrop {
  isRender: boolean
  canvas: HTMLCanvasElement | null
}

const Crop = ({ isRender, canvas }: ICrop) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (canvas === null) return
    setSize({
      width: canvas.clientWidth - 2,
      height: canvas.clientHeight - 2,
    })
    setPosition({
      top: canvas.offsetTop - 2,
      left: canvas.offsetLeft - 2,
    })
  }, [isRender])

  if (!isRender) return <></>
  return <CropStyled width={size.width} height={size.height} top={position.top} left={position.left} />
}

export default Crop

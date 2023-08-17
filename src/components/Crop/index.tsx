import { useEffect, useState } from 'react'
import CropStyled from './style'

interface ICrop {
  isRender: boolean
  canvas: HTMLCanvasElement | null
  color: string
}

const borderW = 4
const classList = ['nw-resize', 'ne-resize', 'se-resize', 'sw-resize', 'row-resize', 'col-resize']

const Crop = ({ isRender, canvas, color }: ICrop) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  const removeAllClass = (ele: HTMLElement) => {
    classList.forEach((cl) => {
      ele.classList.remove(cl)
    })
  }

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const { left, top, width, height } = target.getBoundingClientRect() // DIV 요소 위치/크기 정보

    const reX = e.clientX - left // DIV 요소 안 X 상대좌표
    const reY = e.clientY - top // DIV 요소 안 Y 상대좌표

    console.log(width, height)

    // 마우스 커서가 border 영역에 위치한지 확인
    // const isOnBorder = mouseX >= rect.left + borderWidth && mouseX <= rect.right - borderWidth && mouseY >= rect.top + borderWidth && mouseY <= rect.bottom - borderWidth

    console.log(`X: ${reX}, Y:${reY}`)

    if (reY < borderW) {
      removeAllClass(target)
      if (reX < borderW) {
        target.classList.add('nw-resize')
      } else if (reX > width - borderW) {
        target.classList.add('ne-resize')
      } else {
        target.classList.add('row-resize')
      }
    } else {
      target.classList.remove('row-resize')
      target.classList.remove('col-resize')
    }

    // if (isOnBorder) {
    //   console.log('마우스가 DIV 요소의 border에 위치합니다.')
    //   // 여기에 원하는 동작을 추가할 수 있습니다.
    // }
  }

  useEffect(() => {
    if (canvas === null) return
    setSize({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    })
    setPosition({
      top: canvas.offsetTop,
      left: canvas.offsetLeft,
    })
  }, [isRender])

  if (!isRender) return <></>
  return (
    <>
      <CropStyled width={size.width} height={size.height} top={position.top} left={position.left} color={color} onMouseMove={mouseMove}>
        <span className="crop-line" />
      </CropStyled>
    </>
  )
}

export default Crop

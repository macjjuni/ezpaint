import { useEffect, useState, useRef } from 'react'
import CropStyled from './style'
import { headerHeight } from '@/layout/layout.style'

interface ICrop {
  isRender: boolean
  canvas: HTMLCanvasElement | null
  color: string
}

interface IEdit {
  topLeft: boolean
  topRight: boolean
  bottomLeft: boolean
  bottomRight: boolean
}

const squareWidth = 8
const defaultEdit = {
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false,
}

type ClassTypes = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
const classes: ClassTypes[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']

const Crop = ({ isRender, canvas, color }: ICrop) => {
  const [isEdit, setEdit] = useState<IEdit>({ ...defaultEdit })
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const tempPos = useRef({
    x: 0,
    y: 0,
  })
  const tempSize = useRef({
    w: 0,
    h: 0,
  })

  const onEditMode = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement

    tempPos.current.x = e.pageX
    tempPos.current.y = e.pageY

    const targetPos = classes.find((cls) => target.classList.contains(cls))
    if (!targetPos) {
      setEdit(defaultEdit)
      return
    }
    const newEdit = { ...defaultEdit }
    newEdit[targetPos] = true
    setEdit(newEdit)
  }

  // 수정모드 종료
  const offEditMode = () => {
    console.log('Off Edit Mode')
    tempSize.current.w = width
    tempSize.current.h = height
    setEdit(defaultEdit)
  }

  // 수정모드일 경우 Resiz
  const cropResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvas === null) return

    if (isEdit.topLeft || isEdit.topRight || isEdit.bottomLeft || isEdit.bottomRight) {
      const { pageX, pageY } = e
      const reX = pageX - tempPos.current.x
      const reY = pageY - tempPos.current.y

      if (isEdit.topLeft) {
        // X축
        setLeft(tempPos.current.x + reX)
        setWidth(tempSize.current.w - reX)
        // Y축
        setTop(tempPos.current.y + reY - headerHeight)
        setHeight(tempSize.current.h - reY)
      } else if (isEdit.topRight) {
        // Top-Right Point
        setWidth(tempSize.current.w - -reX) // X축
        // Y축
        setTop(tempPos.current.y + reY - headerHeight)
        setHeight(tempSize.current.h - reY)
      }
      if (isEdit.bottomLeft) {
        // X축
        setLeft(tempPos.current.x + 1 + reX)
        setWidth(tempSize.current.w - reX)
        setHeight(tempSize.current.h - -reY) // Y축
      } else if (isEdit.bottomRight) {
        setWidth(tempSize.current.w - -reX) // X축
        setHeight(tempSize.current.h - -reY) // Y축
      }
    }
  }

  useEffect(() => {
    if (canvas === null) return
    tempPos.current.x = canvas.offsetLeft
    tempPos.current.y = canvas.offsetTop
    tempSize.current.w = canvas.clientWidth
    tempSize.current.h = canvas.clientHeight

    setWidth(canvas.clientWidth)
    setHeight(canvas.clientHeight)
    setTop(canvas.offsetTop)
    setLeft(canvas.offsetLeft)
  }, [isRender])

  if (!isRender) return <></>
  return (
    <>
      <CropStyled.Wrap onMouseDown={onEditMode} onMouseMove={cropResize} onMouseUp={offEditMode} onMouseLeave={offEditMode}>
        <CropStyled.Resize width={width} height={height} top={top} left={left} color={color} squareWidth={squareWidth}>
          <div className="topLeft" /> <div className="topRight" /> <div className="bottomLeft" /> <div className="bottomRight" />
        </CropStyled.Resize>
      </CropStyled.Wrap>
    </>
  )
}

export default Crop

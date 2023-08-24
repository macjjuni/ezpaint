import { useEffect } from 'react'
import Slider from 'react-rangeslider'
import { useBearStore } from '@/zustand/store'
import RangeStyled from './style'
import 'react-rangeslider/lib/index.css'

const checkList = ['rangeslider__handle', 'rangeslider']

const Range = ({ renderToggle }: { renderToggle: () => void }) => {
  const { thick, setThick, color } = useBearStore((state) => state)

  const changeRagne = (w: number) => {
    setThick(w)
  }

  const clickCheck = (e: MouseEvent) => {
    const ele = e.target as HTMLElement
    if (ele.tagName === 'path' || ele.tagName === 'svg') return

    const isContain = ele.className.includes('rangeslider')
    if (!isContain) renderToggle()
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const isContain = checkList.some((cls) => target.classList.contains(cls))
    if (isContain) {
      setTimeout(() => {
        renderToggle()
      }, 150)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickCheck)
    return () => {
      window.removeEventListener('click', clickCheck)
    }
  }, [])
  return (
    <>
      <RangeStyled.Wrap className="rangeslider" color={color} onMouseUp={onMouseUp}>
        <Slider min={1} max={25} step={1} value={thick} onChange={changeRagne} tooltip={false} />
      </RangeStyled.Wrap>
    </>
  )
}

export default Range

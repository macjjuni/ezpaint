import { useEffect } from 'react'
import Slider from 'react-rangeslider'
import { useBearStore } from '@/zustand/store'
import RangeStyled from './style'
import 'react-rangeslider/lib/index.css'

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

  useEffect(() => {
    window.addEventListener('click', clickCheck)
    return () => {
      window.removeEventListener('click', clickCheck)
    }
  }, [])
  return (
    <>
      <RangeStyled.Wrap className="rangeslider" color={color}>
        <Slider min={1} max={25} step={1} value={thick} onChange={changeRagne} tooltip={false} />
      </RangeStyled.Wrap>
    </>
  )
}

export default Range

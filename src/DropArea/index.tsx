import { useState, useRef, useCallback, type DragEvent, ChangeEvent } from 'react'
import DropAreaStyle from './style'
import Button from '@/components/Button'
import { dropStyleName } from '@/styles/theme'

interface IDropArea {
  paintImage: (img: File) => void
}

const DropArea = ({ paintImage }: IDropArea) => {
  const inputRef = useRef<HTMLInputElement>(null) // Input Element Ref
  const [className, setClassName] = useState<'highlight' | ''>('')

  const clickInput = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.click()
  }, [])

  const preventDefaults = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // Drop CSS 효과
  const DragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setClassName(dropStyleName)
  }, [])
  const unDragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setClassName('')
  }, [])

  const DropFile = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setClassName('')

    const file: File = e.dataTransfer.files[0] // 한 개 파일만 허용
    const isImg = file.type.startsWith('image/') // 이미지 파일 형식 확인
    if (isImg) paintImage(file)
  }, [])

  // 인풋 태그로 이미지 선택 이벤트
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const file = e.target.files[0]
      paintImage(file)
    }
  }

  return (
    <>
      <input ref={inputRef} type="file" id="drop-zone" accept="image/*" multiple={false} onChange={changeInput} style={{ display: 'none' }} />
      <DropAreaStyle className={className} onDragEnter={DragHighlight} onDragOver={DragHighlight} onDragLeave={unDragHighlight} onDrop={DropFile}>
        Drop Files here!
        <Button onClick={clickInput}>파일 선택</Button>
      </DropAreaStyle>
    </>
  )
}

export default DropArea

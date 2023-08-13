import { useState, useRef, useCallback, type DragEvent, ChangeEvent } from 'react'
import DropAreaStyled from './style'
import Button from '@/components/Button'
import { dropStyleName } from '@/styles/theme'

interface IDropArea {
  isRender: boolean
  paintImage: (img: File) => void
}

const DropArea = ({ isRender, paintImage }: IDropArea) => {
  const inputRef = useRef<HTMLInputElement>(null) // Input Element Ref
  const [className, setClassName] = useState<'highlight' | ''>('')

  // 이미지 선택 이벤트
  const clickInput = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.click()
  }, [])

  const preventDefaults = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // 파일 Drop CSS 효과 이벤트
  const DragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setClassName(dropStyleName)
  }, [])
  const unDragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setClassName('')
  }, [])

  // 파일 Drop 이벤트
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
  if (isRender)
    return (
      <>
        <input ref={inputRef} type="file" id="drop-zone" accept="image/*" multiple={false} onChange={changeInput} style={{ display: 'none' }} />
        <DropAreaStyled.DropArea className={className} onDragEnter={DragHighlight} onDragOver={DragHighlight} onDragLeave={unDragHighlight} onDrop={DropFile}>
          <div className="drop-text-wrapper">
            <h2 className="drop-txt ellipsis">Drop Files here</h2>
            <h2 className="drop-txt">&</h2>
            <h2 className="drop-txt">Paste from Clipboard&#40;Ctrl + v&#41;</h2>
          </div>

          <Button fontSize={16} onClick={clickInput}>
            <DropAreaStyled.ButtonWrapper>
              <img src="/images/image-icon.webp" alt="button icon" width="32" height="32" />
              <span>이미지 선택</span>
            </DropAreaStyled.ButtonWrapper>
          </Button>
        </DropAreaStyled.DropArea>
      </>
    )
  else return <></>
}

export default DropArea

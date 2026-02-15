import { useState, useRef, useCallback, type DragEvent, ChangeEvent } from 'react'

interface IDropArea {
  isRender: boolean
  paintImage: (img: File) => void
}

const DropArea = ({ isRender, paintImage }: IDropArea) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const clickInput = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.click()
  }, [])

  const preventDefaults = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const DragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setIsDragging(true)
  }, [])

  const unDragHighlight = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setIsDragging(false)
  }, [])

  const DropFile = useCallback((e: DragEvent<HTMLDivElement>) => {
    preventDefaults(e)
    setIsDragging(false)

    const file: File = e?.dataTransfer?.files[0]
    const isImg = file?.type?.startsWith('image/')
    if (isImg) paintImage(file)
  }, [])

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const file = e.target.files[0]
      paintImage(file)
    }
  }

  if (!isRender) return null

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id="drop-zone"
        accept="image/*"
        multiple={false}
        onChange={changeInput}
        className="hidden"
      />

      <div
        className={`
          relative flex flex-col items-center justify-center gap-8 w-4/5 rounded-2xl
          select-none transition-all duration-300 ease-out cursor-pointer
          bg-gradient-to-br from-neutral-50 to-neutral-200
          border-2 border-dashed border-slate-300
          shadow-lg hover:shadow-xl
          ${isDragging
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-100 scale-105 rotate-2'
            : 'hover:border-slate-400 hover:scale-[1.02]'
          }
        `}
        style={{ height: 'calc(100dvh * 0.4)' }}
        onDragEnter={DragHighlight}
        onDragOver={DragHighlight}
        onDragLeave={unDragHighlight}
        onDrop={DropFile}
        onClick={clickInput}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* 아이콘 영역 */}
          <div className={`
            flex items-center justify-center w-20 h-20 rounded-full
            bg-gradient-to-br from-blue-500 to-indigo-600
            shadow-lg transition-transform duration-300
            ${isDragging ? 'scale-110 animate-pulse' : 'scale-100'}
          `}>
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-700">
              {isDragging ? 'Drop your image here' : 'Click to Select Image'}
            </h2>
            <p className="text-lg text-slate-500 font-medium">or</p>
            <p className="text-base text-slate-400">
              Drag & Drop your image here
            </p>
            <p className="text-sm text-slate-400">
              Paste from Clipboard <span className="font-mono text-xs">(Ctrl + V)</span>
            </p>
          </div>

          {/* 지원 형식 */}
          <p className="text-xs text-slate-400">
            Supports: PNG, JPG, JPEG, GIF, WebP
          </p>
        </div>
      </div>
    </>
  )
}

export default DropArea

import moment from 'moment'
import { defaultPadding } from '@/layout/layout.style'

// 캔버스에 이미지 그리기 (이미지 사이즈 리팩토링을 위해 로직 분리)
export const drawImageInCanvas = (canvas: HTMLCanvasElement | null, image: Blob | File) => {
  if (canvas === null) {
    console.error('canvas is null')
    return
  }
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    console.error('ctx is null')
    return
  }

  try {
    const img = new Image()
    img.src = URL.createObjectURL(image)

    img.onload = () => {
      const fullWidth = window.innerWidth - defaultPadding * 2
      // 이미지 길아와 브라우저 해상도 비교
      if (fullWidth > img.width) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.clearRect(0, 0, canvas.width, canvas.height) // 나중에 해상도 사이즈 체크해서 비율로 계산 후 넣어야 함
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height) // 캔버스에 이미지 그리기
      } else {
        canvas.width = fullWidth
        canvas.height = fullWidth / (img.width / img.height) // 비율에 맞게 높이 계산
        ctx.clearRect(0, 0, canvas.width, canvas.height) // 나중에 해상도 사이즈 체크해서 비율로 계산 후 넣어야 함
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height) // 캔버스에 이미지 그리기
      }
      URL.revokeObjectURL(img.src) // Blob URL 해제
    }
    img.onerror = (e) => {
      console.error('이미지 로드 오류', e)
    }
  } catch (err) {
    console.error('An error occurred while painting image:', err)
  }
}

// 이미지 복사 로직
export const copyImageInCanvas = async (canvas: HTMLCanvasElement) => {
  if (canvas.width === 0) return

  const blob: Blob | null = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png', 1)
  })

  if (!blob) {
    console.error('Blob Error!', blob)
    return
  }

  try {
    const data = [new ClipboardItem({ 'image/png': blob })]
    await navigator.clipboard.write(data)
  } catch (err) {
    console.error('Error copying image to clipboard:', err)
  }
}

// 클립보드에 있는 이미지 캔버스에 그리는 함수
export const pasteImageInCanvas = async (canvas: HTMLCanvasElement, render: () => void) => {
  try {
    const clipboardItems = await navigator.clipboard.read() // 클립보드 읽어오기(Only HTTPS)
    const imageItem = clipboardItems.find((item) => item.types.some((type) => type.startsWith('image/'))) // 이미지 형식 찾기

    if (imageItem) {
      const blob = await imageItem.getType('image/png')
      drawImageInCanvas(canvas, blob)
      render()
    }
  } catch (err) {
    console.error('Error pasting image:', err)
  }
}

// 이미지 파일을 받아와 캔버스에 그리는 함수 (다른 컴포넌트에서 사용)
export const paintImageInCanvas = async (canvas: HTMLCanvasElement, ImageFile: File) => {
  try {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context is not available.')
    drawImageInCanvas(canvas, ImageFile)
  } catch (err) {
    console.error('An error occurred while painting image:', err)
  }
}

interface IXY {
  x: number
  y: number
}

export const drawCanvas = (canvas: HTMLCanvasElement, moveToXY: IXY, lineToXY: IXY) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    console.error('ctx is null')
    return
  }

  ctx.beginPath()
  ctx.moveTo(moveToXY.x, moveToXY.y)
  ctx.lineTo(lineToXY.x, lineToXY.y)
  ctx.stroke()
}

export const dataUrlDrawInCanvas = (canvas: HTMLCanvasElement, dataUrl: string) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    console.error('ctx is null')
    return
  }

  const img = new Image()
  img.src = dataUrl
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}

export const downloadImage = async (canvas: HTMLCanvasElement) => {
  const aTag = document.createElement('a')

  canvas.toBlob(
    (blob) => {
      if (blob === null) {
        console.error('download error!')
        return
      }
      const url = URL.createObjectURL(blob)
      aTag.href = url
      aTag.target = '_blank'
      aTag.download = `${moment().format('yyyy-MM-DD_HH:mm:ss')}.png`
      aTag.click()
      URL.revokeObjectURL(url)
    },
    'image/png',
    1
  )
}

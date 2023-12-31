import moment from 'moment'
import { type Crop as CropTypes } from 'react-image-crop'
import { defaultPadding } from '@/layout/layout.style'

export interface ICanvasData {
  base64: string
  width: number
  height: number
}

interface IXY {
  x: number
  y: number
}

// 캔버스에 이미지 그리기 (이미지 사이즈 리팩토링을 위해 로직 분리)
export const drawImageInCanvas = async (canvas: HTMLCanvasElement, image: Blob | File) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context is not available.')

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

export const drawCanvas = (ctx: CanvasRenderingContext2D, moveToXY: IXY, lineToXY: IXY) => {
  ctx.imageSmoothingQuality = 'high'
  ctx.beginPath()
  ctx.moveTo(moveToXY.x, moveToXY.y)
  ctx.lineTo(lineToXY.x, lineToXY.y)
  ctx.stroke()
}

export const drawPoint = (ctx: CanvasRenderingContext2D, moveToXY: IXY, color: string, thick: number) => {
  ctx.beginPath() // 새로운 path 생성
  ctx.arc(moveToXY.x, moveToXY.y, thick / 2, 0, Math.PI * 2, false) // 원형 그리기
  ctx.fillStyle = color // 색상 설정
  ctx.fill() // path 내부를 채움
  ctx.closePath() // path 닫기
}

export const dataUrlDrawInCanvas = (canvas: HTMLCanvasElement, canvasData: ICanvasData) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context is not available.')
  ctx.imageSmoothingQuality = 'high'

  const img = new Image()
  // width, height이 있는 경우는 Crop 후 이미지 그릴 때
  if (canvasData.width && canvasData.height) {
    canvas.width = canvasData.width
    canvas.height = canvasData.height
  }
  img.src = canvasData.base64
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

// 자른 이미지 파라미터로 받아서 base64 형식으로 내보내기
export const cropImage = (image: HTMLImageElement, crop: CropTypes): ICanvasData | undefined => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context is not available.')

  const pixelRatio = window.devicePixelRatio
  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height)

  const base64 = canvas.toDataURL('image/jpeg') // Converting to base64
  return { base64, width: crop.width, height: crop.height }
}

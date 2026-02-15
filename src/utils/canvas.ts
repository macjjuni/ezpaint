import { type Crop as CropTypes } from 'react-image-crop'
import { HORIZONTAL_PADDING, IMAGE_QUALITY, IMAGE_FORMAT_JPEG, IMAGE_FORMAT_PNG } from '@/constants'
import { type ICanvasData, type IXY } from '@/types'

export type { ICanvasData } from '@/types'

/**
 * 캔버스에 이미지를 그리고 뷰포트에 맞게 자동 리사이징
 *
 * @param canvas - 대상 캔버스 엘리먼트
 * @param image - 그릴 이미지 파일 또는 Blob
 * @returns 이미지가 그려지면 resolve되는 Promise
 * @throws {Error} 캔버스 컨텍스트를 가져올 수 없는 경우
 */
export const drawImageInCanvas = (canvas: HTMLCanvasElement, image: Blob | File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Canvas context is not available.'))
      return
    }

    const img = new Image()
    img.src = URL.createObjectURL(image)

    img.onload = () => {
      try {
        const maxWidth = window.innerWidth - HORIZONTAL_PADDING

        let finalWidth = img.width
        let finalHeight = img.height

        // 이미지 가로가 브라우저보다 큰 경우만 축소
        if (img.width > maxWidth) {
          finalWidth = maxWidth
          finalHeight = (maxWidth / img.width) * img.height
        }

        canvas.width = finalWidth
        canvas.height = finalHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        URL.revokeObjectURL(img.src) // Blob URL 해제
        resolve()
      } catch (err) {
        URL.revokeObjectURL(img.src)
        reject(err)
      }
    }

    img.onerror = () => {
      URL.revokeObjectURL(img.src) // 메모리 누수 방지
      reject(new Error('이미지 로드 오류'))
    }
  })
}

/**
 * 캔버스 이미지를 클립보드에 PNG 형식으로 복사
 *
 * @param canvas - 복사할 캔버스 엘리먼트
 */
export const copyImageInCanvas = async (canvas: HTMLCanvasElement) => {
  if (canvas.width === 0) return

  const blob: Blob | null = await new Promise((resolve) => {
    canvas.toBlob(resolve, IMAGE_FORMAT_PNG, IMAGE_QUALITY)
  })

  if (!blob) {
    console.error('Blob Error!', blob)
    return
  }

  try {
    const data = [new ClipboardItem({ [IMAGE_FORMAT_PNG]: blob })]
    await navigator.clipboard.write(data)
  } catch (err) {
    console.error('Error copying image to clipboard:', err)
  }
}

/**
 * 클립보드에 있는 이미지를 캔버스에 붙여넣기
 *
 * @param canvas - 대상 캔버스 엘리먼트
 * @param render - 붙여넣기 후 호출할 렌더링 콜백 함수
 */
export const pasteImageInCanvas = async (canvas: HTMLCanvasElement, render: () => void) => {
  try {
    const clipboardItems = await navigator.clipboard.read() // 클립보드 읽어오기(Only HTTPS)
    const imageItem = clipboardItems.find((item) => item.types.some((type) => type.startsWith('image/'))) // 이미지 형식 찾기

    if (imageItem) {
      // 클립보드에 있는 실제 이미지 타입 찾기
      const imageType = imageItem.types.find((type) => type.startsWith('image/'))
      if (imageType) {
        const blob = await imageItem.getType(imageType)
        await drawImageInCanvas(canvas, blob)
        render()
      }
    }
  } catch (err) {
    console.error('Error pasting image:', err)
  }
}

/**
 * 두 점 사이에 선을 그림
 *
 * @param ctx - 캔버스 렌더링 컨텍스트
 * @param moveToXY - 시작 좌표
 * @param lineToXY - 끝 좌표
 */
export const drawCanvas = (ctx: CanvasRenderingContext2D, moveToXY: IXY, lineToXY: IXY) => {
  ctx.imageSmoothingQuality = 'high'
  ctx.beginPath()
  ctx.moveTo(moveToXY.x, moveToXY.y)
  ctx.lineTo(lineToXY.x, lineToXY.y)
  ctx.stroke()
}

/**
 * 펜 도구로 단일 점(원형)을 그림
 *
 * @param ctx - 캔버스 렌더링 컨텍스트
 * @param moveToXY - 점을 그릴 좌표
 * @param color - 점의 색상
 * @param thick - 점의 두께(지름)
 */
export const drawPoint = (ctx: CanvasRenderingContext2D, moveToXY: IXY, color: string, thick: number) => {
  ctx.beginPath() // 새로운 path 생성
  ctx.arc(moveToXY.x, moveToXY.y, thick / 2, 0, Math.PI * 2, false) // 원형 그리기
  ctx.fillStyle = color // 색상 설정
  ctx.fill() // path 내부를 채움
  ctx.closePath() // path 닫기
}

/**
 * Base64 인코딩된 이미지 데이터를 캔버스에 렌더링
 *
 * @param canvas - 대상 캔버스 엘리먼트
 * @param canvasData - Base64 이미지 데이터 및 크기 정보
 * @returns 렌더링이 완료되면 resolve되는 Promise
 * @throws {Error} 캔버스 컨텍스트를 가져올 수 없거나 이미지 로드에 실패한 경우
 */
export const dataUrlDrawInCanvas = (canvas: HTMLCanvasElement, canvasData: ICanvasData): Promise<void> => {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Canvas context is not available.'))
      return
    }
    ctx.imageSmoothingQuality = 'high'

    const img = new Image()
    // width, height이 있는 경우는 Crop 후 이미지 그릴 때
    if (canvasData.width && canvasData.height) {
      canvas.width = canvasData.width
      canvas.height = canvasData.height
    }
    img.src = canvasData.base64
    img.onload = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve()
      } catch (err) {
        reject(err)
      }
    }
    img.onerror = () => {
      reject(new Error('이미지 로드 실패'))
    }
  })
}

/**
 * 캔버스 이미지를 타임스탬프 파일명으로 PNG 다운로드
 *
 * @param canvas - 다운로드할 캔버스 엘리먼트
 */
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
      const now = new Date()
      const timestamp = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-')
      aTag.download = `${timestamp}.png`
      aTag.click()
      URL.revokeObjectURL(url)
    },
    IMAGE_FORMAT_PNG,
    IMAGE_QUALITY
  )
}

/**
 * 이미지의 지정된 영역을 자르고 Base64 형식으로 변환
 *
 * @param image - 원본 이미지 엘리먼트
 * @param crop - 자를 영역의 좌표 및 크기 정보
 * @returns 잘린 이미지의 Base64 데이터 및 크기
 * @throws {Error} 캔버스 컨텍스트를 가져올 수 없는 경우
 */
export const cropImage = (image: HTMLImageElement, crop: CropTypes): ICanvasData => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context is not available.')

  const pixelRatio = window.devicePixelRatio
  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height)

  const base64 = canvas.toDataURL(IMAGE_FORMAT_JPEG, IMAGE_QUALITY) // Converting to base64
  return { base64, width: crop.width, height: crop.height }
}

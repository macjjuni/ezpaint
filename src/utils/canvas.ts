// 캔버스에 이미지 그리기 (이미지 사이즈 리팩토링을 위해 로직 분리)
const drawCanvas = (canvas: HTMLCanvasElement | null, image: Blob | File) => {
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
      canvas.width = img.width
      canvas.height = img.height

      console.log(`width: ${img.width}, height: ${img.height}`)

      ctx.clearRect(0, 0, canvas.width, canvas.height) // 나중에 해상도 사이즈 체크해서 비율로 계산 후 넣어야 함
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height) // 캔버스에 이미지 그리기
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
      drawCanvas(canvas, blob)
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
    drawCanvas(canvas, ImageFile)
  } catch (err) {
    console.error('An error occurred while painting image:', err)
  }
}

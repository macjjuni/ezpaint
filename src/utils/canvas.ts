// 이미지 붙여넣기 로직

export const pasteImageInCanvas = async (canvas: HTMLCanvasElement) => {
  try {
    const clipboardItems = await navigator.clipboard.read() // 클립보드 읽어오기(Only HTTPS)
    const imageItem = clipboardItems.find((item) => item.types.some((type) => type.startsWith('image/'))) // 이미지 형식 찾기

    if (imageItem) {
      const blob = await imageItem.getType('image/png')
      const img = new Image()

      img.onload = () => {
        if (canvas === null) return

        const ctx = canvas.getContext('2d')
        if (ctx === null) return

        console.log(`width: ${img.width}px, height: ${img.height}px`)

        ctx.clearRect(0, 0, canvas.width, canvas.height) // 나중에 해상도 사이즈 체크해서 비율로 계산 후 넣어야 함
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0) // 캔버스에 이미지 그리기
      }
      img.src = URL.createObjectURL(blob)
    }
  } catch (error) {
    console.error('Error pasting image:', error)
  }
}

// 이미지 복사 로직

export const copyImageInCanvas = async (canvas: HTMLCanvasElement) => {
  const blob: Blob | null = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })

  if (!blob) {
    console.error('Blob Error!', blob)
    return
  }

  try {
    const data = [new ClipboardItem({ 'image/png': blob })]
    await navigator.clipboard.write(data)
  } catch (e) {
    console.error('Error copying image to clipboard:', e)
  }
}

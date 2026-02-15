export class CanvasError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CanvasError'
  }
}

export class IndexedDBError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message)
    this.name = 'IndexedDBError'
  }
}

export class ImageLoadError extends Error {
  constructor(
    message: string,
    public readonly imageSource?: string
  ) {
    super(message)
    this.name = 'ImageLoadError'
  }
}

/**
 * 캔버스 관련 에러 처리 유틸리티
 *
 * @param error - 발생한 에러
 * @param userMessage - 사용자에게 표시할 메시지
 * @param showToast - 토스트 메시지 표시 여부 (기본값: true)
 */
export const handleCanvasError = (
  error: unknown,
  userMessage: string,
  showToast: boolean = true
) => {
  console.error('[Canvas Error]:', error)
  if (showToast) {
    // kToast.error(userMessage)
    // Toast 라이브러리가 필요할 경우 여기서 호출
  }
}

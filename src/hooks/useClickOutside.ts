import { useEffect, RefObject } from 'react'

/**
 * 지정된 요소 외부를 클릭했을 때 콜백을 실행하는 커스텀 훅
 *
 * @param ref - 외부 클릭을 감지할 요소의 ref
 * @param callback - 외부 클릭 시 실행할 콜백 함수
 * @param excludeSelectors - 외부 클릭으로 간주하지 않을 CSS 선택자 배열
 * @param delay - 이벤트 리스너 등록 전 대기 시간(ms)
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  excludeSelectors: string[] = [],
  delay: number = 0
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (ref.current && !ref.current.contains(target)) {
        const isExcluded = excludeSelectors.some(selector =>
          target.closest(selector)
        )

        if (!isExcluded) {
          callback()
        }
      }
    }

    const timeoutId = setTimeout(() => {
      window.addEventListener('click', handleClickOutside)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [ref, callback, excludeSelectors, delay])
}

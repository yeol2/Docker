import { RefObject, useEffect } from 'react';

/**
 * 하나 이상의 지정된 요소 외부를 클릭할 때 콜백을 실행하는 커스텀 훅입니다.
 *
 * @param ref - 단일 RefObject<T> 또는 RefObject<HTMLElement> 배열
 * @param callback - 외부 클릭 감지 시 실행할 함수
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<HTMLElement | null>[],
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

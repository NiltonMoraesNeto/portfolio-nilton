import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirtsTime = useRef(notDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirtsTime.current) {
        isFirtsTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};

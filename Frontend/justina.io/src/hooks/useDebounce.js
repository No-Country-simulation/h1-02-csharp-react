import { useCallback, useRef,useEffect } from 'react';

function useDebounce(callback, delay = 300) {
  const timeoutRef = useRef(null);
  // Guarda la referencia del callback para evitar la dependencia en `useCallback`
  const callbackRef = useRef(callback); 

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  // Limpia el timeout si el componente se desmonta
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

export default useDebounce;
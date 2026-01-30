'use client';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

// Custom Debounce Hook
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceRef = useRef(
    debounce((nextValue: string) => setDebouncedValue(nextValue), delay),
  );

  useEffect(() => {
    const currentDebounce = debounceRef.current;
    currentDebounce(value);

    return () => {
      currentDebounce.cancel();
    };
  }, [value]);

  return debouncedValue;
}

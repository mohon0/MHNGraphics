import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetValue = useMemo(
    () =>
      debounce((newValue: T) => {
        setDebouncedValue(newValue);
      }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetValue(value);
    return () => {
      debouncedSetValue.cancel(); // Cleanup on unmount
    };
  }, [value, debouncedSetValue]);

  return debouncedValue;
}

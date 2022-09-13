import { useCallback, useState } from "react";

import { type Error } from "../types";

export const useFetchMock = <T, P = undefined>(
  f: (params?: P) => Promise<T[]>,
  p?: P
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [value, setValue] = useState<T[]>([]);

  const getMock = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await f(p);
      setValue(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [error, f, p]);

  return { value, isLoading, error, getMock };
};

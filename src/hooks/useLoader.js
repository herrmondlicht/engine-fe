import { useCallback, useEffect, useRef, useState } from "react";

const useLoader = () => {
  const [isLoading, setIsLoadingRaw] = useState();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setIsLoading = useCallback(loadingValue => {
    if (isMounted.current) {
      setIsLoadingRaw(loadingValue);
    }
  }, []);

  return [isLoading, setIsLoading];
};

export { useLoader };

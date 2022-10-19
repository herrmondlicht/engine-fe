import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import theme from "theme";

export const ScreenLoader = ({ children, radius = false, isLoading }) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return;
    }
    setShowLoader(true);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);
  return (
    <div className="h-full w-full relative">
      {showLoader && (
        <div
          data-testid="ScreenLoader_loader"
          className={`absolute h-full w-full bg-white transition-duration-400 flex justify-center items-center ${
            isLoading ? "opacity-70 z-10" : "opacity-0 z-0"
          } ${radius ? "rounded-3xl" : ""}`}
        >
          <Loader
            type="TailSpin"
            height={50}
            width={50}
            color={theme.colors.primary[0]}
          />
        </div>
      )}
      {children}
    </div>
  );
};

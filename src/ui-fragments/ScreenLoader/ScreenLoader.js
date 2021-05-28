import Loader from "react-loader-spinner";
import { theme } from "twtheme";

export const ScreenLoader = ({ children, radius = false, isLoading }) => {
  return (
    <div className={"h-full w-full relative"}>
      <div
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
      {children}
    </div>
  );
};

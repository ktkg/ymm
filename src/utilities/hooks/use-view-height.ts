import { useLayoutEffect, useState } from "react";

export const useViewHeight = () => {
  const [viewHeight, setViewHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = () => {
      setViewHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  });

  return viewHeight;
};

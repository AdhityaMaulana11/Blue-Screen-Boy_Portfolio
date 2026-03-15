import { useState, useCallback } from "react";
import { useMode } from "../context/ModeContext";

const useSequentialReveal = (count: number) => {
  const { devMode } = useMode();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((i) => Math.min(i + 1, count));
  }, [count]);

  const isActive = (index: number) => !devMode || index <= activeIndex;
  const onComplete = (index: number) =>
    index === activeIndex ? next : undefined;

  return { isActive, onComplete };
};

export default useSequentialReveal;

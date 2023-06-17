import { useEffect, useState } from "react";

const useFullHeight = () => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("popstate", () => {
      setTimeout(() => {
        updateSize();
      }, 500);
    });
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("popstate", updateSize);
    };
  }, []);
  return size;
};

export default useFullHeight;

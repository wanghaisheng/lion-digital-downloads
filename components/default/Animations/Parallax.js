import * as React from "react";
import { useState, useRef, useLayoutEffect } from "react";
import { render } from "react-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const Parallax = ({ children }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, -1], {
    clamp: false
  });

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <div ref={ref} className="image-container">
      <motion.div className="overlay">
        {children}
      </motion.div>
    </div>
  );
};

export default Parallax;
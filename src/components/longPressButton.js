import React, { useState, useEffect, useRef } from "react";

const LongPressButton = ({ onClick, duration = 500, className, icon }) => {
  const [isPressing, setIsPressing] = useState(false);
  const timeoutRef = useRef(null);
  const scaleRef = useRef(1);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isPressing) {
      scaleRef.current = 1;
      let steps = 40;
      let scaleIncrement = (1.2 - 1) / steps;
      let intervalDuration = duration / steps;

      const interval = setInterval(() => {
        if (scaleRef.current < 1.2 && buttonRef.current) {
          scaleRef.current += scaleIncrement;
          buttonRef.current.style.transform = `scale(${scaleRef.current})`;
        } else {
          clearInterval(interval);
          if (scaleRef.current >= 1.2) {
            onClick();
            setIsPressing(false);
          }
        }
      }, intervalDuration);

      return () => clearInterval(interval);
    } else {
      if (buttonRef.current) {
        buttonRef.current.style.transform = "scale(1)";
      }
    }
  }, [isPressing, duration, onClick]);

  const handleMouseDown = () => {
    setIsPressing(true);
    timeoutRef.current = setTimeout(() => {
      onClick();
    }, duration);
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current);
    setIsPressing(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsPressing(false);
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s linear",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </button>
  );
};

export default LongPressButton;

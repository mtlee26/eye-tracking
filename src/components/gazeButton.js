import { useState, useEffect } from "react";

export default function GazeButton({
  children,
  style,
  onClick,
  className,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isHovered) {
      let elapsedTime = 0;
      timer = setInterval(() => {
        elapsedTime += 50;
        setProgress((elapsedTime / 1500) * 100);

        if (elapsedTime >= 1500) {
          clearInterval(timer);
          handleHoverActivate();
        }
      }, 50);
    } else {
      clearInterval(timer);
      setProgress(0);
    }

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleHoverActivate = () => {
    onClick();
  };

  return (
    <>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        className={className}
        props
      >
        {children}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${progress}%`,
            height: "5px",
            backgroundColor: "#adc6ff",
            transition: "width 0.05s ease-out",
            zIndex: 1,
          }}
        />
      </button>
    </>
  );
}

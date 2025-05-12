import { useState, useEffect } from "react";

export default function RootLayoutButton({
  children,
  style,
  onClick,
  className,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        handleHoverActivate();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const handleHoverActivate = () => {
    onClick();
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 1.5s ease",
        backgroundColor: "rgba(252, 215, 251, 0.5)",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
      className={`${className} bg-opacity-50`}
      {...props}
    >
      <span
        style={{
          color: isHovered ? "white" : "#c2c2c2",
          transition: "color 0.3s ease",
        }}
      >
        {children}
      </span>
    </button>
  );
}

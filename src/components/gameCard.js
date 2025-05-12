import React, { useEffect, useState } from "react";

const Card = ({ image, title, author, genre, action, gradient, onClick }) => {
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
    <div
      onClick={onClick}
      className={`w-80 rounded-xl overflow-hidden shadow-lg text-white transform transition-transform duration-300 hover:-translate-y-3 bg-gradient-to-b ${gradient} hover:cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="relative p-4 z-10 bg-gray-700 bg-opacity-50 backdrop-blur-sm">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-200">{author}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-200">{genre}</div>
          <button className="bg-gray-800 text-white py-1 px-4 rounded-full text-sm hover:bg-gray-700">
            {action}
          </button>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          bottom: 0,
          left: 0,
          width: `${progress}%`,
          height: "5px",
          backgroundColor: "#adc6ff",
          transition: "width 0.05s ease-out",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default Card;

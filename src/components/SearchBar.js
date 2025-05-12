import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const SearchBar = ({ onFocus, onBlur, className }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(
    "Search for a book..."
  );
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const handleHoverActivate = () => {
    setPlaceholderText("Tell me what you're looking for...");
    startListening();
    onFocus();
  };

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

  useEffect(() => {
    if (!isListening) {
      onBlur();
      if (text) {
        router.push(`/search?keyword=${text}`);
      }
    }
  }, [isListening, onBlur]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchQuery = e.target.value.trim();
      if (searchQuery) {
        router.push(`/search?keyword=${searchQuery}`);
      }
    }
  };

  return (
    <div
      className="flex justify-center mb-12 w-full"
      style={{ marginTop: "-20px" }}
    >
      <div className="relative w-2/3">
        <input
          type="text"
          placeholder={placeholderText}
          className={`w-full p-4 pl-12 border rounded-lg text-lg ${className}`}
          onKeyDown={handleSearch}
          onFocus={() => {
            onFocus();
          }}
          onBlur={() => {
            onBlur();
          }}
          onMouseEnter={() => {
            if (!isListening) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          value={text}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.25v1.5m6-6.75a6 6 0 01-12 0m9-3.25v3.25a3 3 0 01-6 0V8a3 3 0 116 0v3.25z"
            />
          </svg>
        </div>
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
      </div>
    </div>
  );
};

export default SearchBar;

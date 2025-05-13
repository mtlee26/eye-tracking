// src/components/web-browsing/VirtualKeyboard.tsx
"use client";
import { useState } from "react";
import GazeButton from "../gazeButton"; // <<< Đảm bảo đường dẫn này đúng
import { X, ArrowLeftToLine, CornerDownLeft, ChevronUp, CaseSensitive, Delete } from "lucide-react"; // <<< Thêm Import Icons

interface VirtualKeyboardProps {
  onInput: (char: string) => void; // Prop để gửi ký tự được nhập
  onAction: (action: "backspace" | "enter" | "space" | "clear") => void; // Prop cho các hành động đặc biệt
  onClose: () => void; // Prop để đóng bàn phím
}

// Layouts (giữ nguyên)
const QWERTY_LAYOUT: string[][] = [ // TypeScript tự suy luận string[][] vì có dữ liệu
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

// === CUNG CẤP DỮ LIỆU CHO CÁC LAYOUT ===
const NUMBERS_LAYOUT: string[][] = [ // Giờ TypeScript có thể suy luận string[][]
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", ","], // Thêm dấu chấm, phẩy nếu muốn
];

const SYMBOLS_LAYOUT: string[][] = [ // Giờ TypeScript có thể suy luận string[][]
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
  ["-", "_", "=", "+", "[", "]", "{", "}", "\\", "|"],
  [";", ":", "'", "\"", "<", ">", "/", "?"], // Bỏ bớt dấu phẩy, chấm nếu đã có ở layout số
];

export default function VirtualKeyboard({ onInput, onAction, onClose }: VirtualKeyboardProps) {
  const [isShift, setIsShift] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<"qwerty" | "numbers" | "symbols">("qwerty");

  const handleKeyPress = (key: string) => {
    let charToInput = key;
    // Xử lý Shift/Caps Lock chỉ cho layout QWERTY
    if (currentLayout === "qwerty" && (isShift || isCapsLock)) {
      charToInput = charToInput.toUpperCase();
    }
    onInput(charToInput); // Gọi prop onInput
    if (isShift) {
      setIsShift(false); // Tự tắt Shift sau khi gõ
    }
  };

  const toggleShift = () => setIsShift(!isShift);
  const toggleCapsLock = () => {
    setIsCapsLock(!isCapsLock);
    if (isShift && !isCapsLock) setIsShift(false);
  };

  const renderKeys = (layout: string[][]) => {
    return layout.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex justify-center gap-1 mb-1">
        {row.map((key) => {
          let displayKey = key;
          // Chỉ viết hoa nếu là layout qwerty
          if (currentLayout === "qwerty" && (isShift || isCapsLock) && key.length === 1) {
             displayKey = key.toUpperCase();
          }
          return (
            <GazeButton
              key={key}
              onClick={() => handleKeyPress(key)} // Sử dụng GazeButton
              className="min-w-[40px] h-12 flex items-center justify-center p-2 bg-gray-600 hover:bg-gray-500 rounded text-lg font-medium shadow-md text-white" // Thêm text-white
            >
              {displayKey}
            </GazeButton>
          );
        })}
      </div>
    ));
  };

  let activeLayoutKeys;
  switch(currentLayout) {
    case "numbers": activeLayoutKeys = renderKeys(NUMBERS_LAYOUT); break;
    case "symbols": activeLayoutKeys = renderKeys(SYMBOLS_LAYOUT); break;
    default: activeLayoutKeys = renderKeys(QWERTY_LAYOUT);
  }

  return (
    <div className="p-2 bg-gray-800 rounded-t-lg border-t-2 border-gray-600 w-full max-w-3xl mx-auto text-white"> {/* Thêm text-white */}
      <div className="flex justify-between items-center mb-2">
        <div>
            <GazeButton onClick={() => setCurrentLayout("qwerty")} className={`px-3 py-1.5 mr-1 rounded text-sm ${currentLayout === 'qwerty' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}>QWERTY</GazeButton>
            <GazeButton onClick={() => setCurrentLayout("numbers")} className={`px-3 py-1.5 mr-1 rounded text-sm ${currentLayout === 'numbers' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}>123</GazeButton>
            <GazeButton onClick={() => setCurrentLayout("symbols")} className={`px-3 py-1.5 rounded text-sm ${currentLayout === 'symbols' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}>#+=</GazeButton>
        </div>
        <GazeButton onClick={onClose} className="p-2 bg-red-600 hover:bg-red-700 rounded-full" title="Đóng bàn phím">
          <X size={20} />
        </GazeButton>
      </div>

      {activeLayoutKeys}

      <div className="flex justify-between gap-1 mt-1">
        <div className="flex gap-1">
            {currentLayout === "qwerty" && (
                <>
                    <GazeButton
                        onClick={toggleShift}
                        className={`min-w-[50px] h-12 flex items-center justify-center p-2 rounded shadow-md ${isShift ? 'bg-blue-500' : 'bg-gray-500 hover:bg-gray-400'}`}
                        title="Shift"
                    > <ChevronUp size={20} /> </GazeButton>
                    <GazeButton
                        onClick={toggleCapsLock}
                        className={`min-w-[50px] h-12 flex items-center justify-center p-2 rounded shadow-md ${isCapsLock ? 'bg-blue-500' : 'bg-gray-500 hover:bg-gray-400'}`}
                        title="Caps Lock"
                    > <CaseSensitive size={20}/> </GazeButton>
                </>
            )}
        </div>

        <GazeButton onClick={() => onAction("space")} className="flex-grow h-12 mx-1 flex items-center justify-center p-2 bg-gray-500 hover:bg-gray-400 rounded text-lg shadow-md" title="Space">
          Dấu cách
        </GazeButton>

        <div className="flex gap-1">
            <GazeButton onClick={() => onAction("backspace")} className="min-w-[60px] h-12 flex items-center justify-center p-2 bg-yellow-600 hover:bg-yellow-500 rounded shadow-md" title="Backspace">
                <Delete size={20} />
            </GazeButton>
            <GazeButton onClick={() => onAction("enter")} className="min-w-[60px] h-12 flex items-center justify-center p-2 bg-green-600 hover:bg-green-500 rounded shadow-md" title="Enter">
                <CornerDownLeft size={20} />
            </GazeButton>
             <GazeButton onClick={() => onAction("clear")} className="min-w-[60px] h-12 flex items-center justify-center p-2 bg-red-600 hover:bg-red-500 rounded shadow-md" title="Clear input">
                Xóa hết
            </GazeButton>
        </div>
      </div>
    </div>
  );
}
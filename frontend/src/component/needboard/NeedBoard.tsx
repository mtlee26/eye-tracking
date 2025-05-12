// // src/components/needboard/NeedBoard.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// // import GazeButton from "../gazeButton"; // Nếu bạn muốn dùng GazeButton

// interface Need {
//   id: string;
//   emoji: string;
//   message: string;
// }

// const initialNeeds: Need[] = [
//   { id: "hungry", emoji: "😋", message: "Tôi đói rồi. Tôi muốn ăn!" },
//   { id: "thirsty", emoji: "🥤", message: "Tôi khát nước. Tôi muốn uống!" },
//   { id: "toilet", emoji: "🚽", message: "Tôi muốn đi vệ sinh!" },
//   { id: "sleepy", emoji: "😴", message: "Tôi buồn ngủ. Tôi muốn đi ngủ!" },
//   { id: "play", emoji: "🎮", message: "Tôi muốn chơi!" },
//   { id: "help", emoji: "🙋", message: "Tôi cần giúp đỡ!" },
//   // Thêm các nhu cầu khác nếu muốn
// ];

// export default function NeedBoard() {
//   const [currentMessage, setCurrentMessage] = useState<string>(
//     "Chọn một biểu tượng nhu cầu..."
//   );

//   const handleEmojiClick = (message: string) => {
//       console.log("Clicked message:", message);

//     setCurrentMessage(message);
//   };


//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
//       {/* Sidebar for Emojis */}
//       <aside className="w-full md:w-48 lg:w-60 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto">
//         {/* ===== SỬA ĐỔI LINK TRANG CHỦ ===== */}
//         <Link
//           href="/" // Đích đến là trang chủ
//           className="w-full mb-0 md:mb-4 flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky md:static top-0 left-0 z-10"
//           // Bỏ legacyBehavior, không cần thẻ <a> con
//         >
//           🏠
//           <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
//         </Link>
//         {/* ===== KẾT THÚC SỬA ĐỔI ===== */}

//         <h3 className="text-lg font-semibold text-gray-700 mb-1 hidden md:block">Chọn nhu cầu:</h3>
//         {initialNeeds.map((need) => (
//           <button
//             key={need.id}
//             onClick={() => handleEmojiClick(need.message)}
//             className="flex-shrink-0 p-3 md:py-3 md:px-4 bg-white border border-gray-300 rounded-lg text-3xl md:text-4xl hover:bg-sky-100 hover:shadow-md transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500"
//             title={need.message.split('.')[0]}
//           >
//             {need.emoji}
//           </button>
//         ))}
//       </aside>

//       {/* Main Content Area for Message */}
//       <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg min-h-[200px] md:min-h-full">
//         <div
//           id="message-display"
//           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-700 break-words"
//           style={{ lineHeight: '1.4' }}
//         >
//           {currentMessage}
//         </div>
//       </main>
//     </div>
//   );
// }
// src/components/needboard/NeedBoard.tsx
"use client";

import { useState, useEffect } from "react"; // Thêm useEffect
import Link from "next/link";

interface Need {
  id: string;
  emoji: string;
  message: string;
}

const initialNeeds: Need[] = [
  { id: "hungry", emoji: "😋", message: "Tôi đói rồi. Tôi muốn ăn!" },
  { id: "thirsty", emoji: "🥤", message: "Tôi khát nước. Tôi muốn uống!" },
  { id: "toilet", emoji: "🚽", message: "Tôi muốn đi vệ sinh!" },
  { id: "sleepy", emoji: "😴", message: "Tôi buồn ngủ. Tôi muốn đi ngủ!" },
  { id: "play", emoji: "🎮", message: "Tôi muốn chơi!" },
  { id: "help", emoji: "🙋", message: "Tôi cần giúp đỡ!" },
];

export default function NeedBoard() {
  const [currentMessage, setCurrentMessage] = useState<string>(
    "Chọn một biểu tượng nhu cầu..."
  );
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Khởi tạo SpeechSynthesis và lấy danh sách giọng nói khi component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);

      const loadVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
        // Cố gắng chọn một giọng nói tiếng Việt nếu có
        const vietnameseVoice = availableVoices.find(voice => voice.lang.startsWith('vi'));
        if (vietnameseVoice) {
          setSelectedVoice(vietnameseVoice);
        } else if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]); // Chọn giọng mặc định nếu không có TV
        }
      };

      // Sự kiện voiceschanged có thể không được kích hoạt ngay, nên gọi trực tiếp
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    } else {
      console.warn("Web Speech API (SpeechSynthesis) is not supported in this browser.");
    }
  }, []);


  const speakText = (textToSpeak: string) => {
    if (speechSynthesis && textToSpeak) {
      // Hủy bỏ bất kỳ lượt nói nào đang diễn ra
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Cấu hình cho utterance (tùy chọn)
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      // utterance.pitch = 1; // 0 đến 2, mặc định 1
      // utterance.rate = 1; // 0.1 đến 10, mặc định 1
      // utterance.volume = 1; // 0 đến 1, mặc định 1

      speechSynthesis.speak(utterance);
    }
  };

  const handleEmojiClick = (message: string) => {
    setCurrentMessage(message);
    speakText(message); // Gọi hàm phát âm thanh
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <aside className="w-full md:w-48 lg:w-60 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto">
        <Link
          href="/"
          className="w-full mb-0 md:mb-4 flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky md:static top-0 left-0 z-10"
        >
          🏠
          <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
        </Link>

        {/* Tùy chọn: Thêm dropdown để chọn giọng nói */}
        {voices.length > 0 && speechSynthesis && (
          <div className="my-2">
            <label htmlFor="voice-select" className="text-sm text-gray-600 block mb-1">Chọn giọng đọc:</label>
            <select
              id="voice-select"
              value={selectedVoice ? selectedVoice.name : ''}
              onChange={(e) => {
                const voiceName = e.target.value;
                const voice = voices.find(v => v.name === voiceName);
                if (voice) setSelectedVoice(voice);
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}


        <h3 className="text-lg font-semibold text-gray-700 mb-1 hidden md:block">Chọn nhu cầu:</h3>
        {initialNeeds.map((need) => (
          <button
            key={need.id}
            onClick={() => handleEmojiClick(need.message)}
            className="flex-shrink-0 p-3 md:py-3 md:px-4 bg-white border border-gray-300 rounded-lg text-3xl md:text-4xl hover:bg-sky-100 hover:shadow-md transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500"
            title={need.message.split('.')[0]}
          >
            {need.emoji}
          </button>
        ))}
      </aside>

      <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg min-h-[200px] md:min-h-full">
        <div
          id="message-display"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-700 break-words"
          style={{ lineHeight: '1.4' }}
        >
          {currentMessage}
        </div>
      </main>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react"; // Thêm useEffect
// import Link from "next/link";

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
// ];

// export default function NeedBoard() {
//   const [currentMessage, setCurrentMessage] = useState<string>(
//     "Chọn một biểu tượng nhu cầu..."
//   );
//   const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

//   // Khởi tạo SpeechSynthesis và lấy danh sách giọng nói khi component mount
//   useEffect(() => {
//     if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
//       const synth = window.speechSynthesis;
//       setSpeechSynthesis(synth);

//       const loadVoices = () => {
//         const availableVoices = synth.getVoices();
//         setVoices(availableVoices);
//         // Cố gắng chọn một giọng nói tiếng Việt nếu có
//         const vietnameseVoice = availableVoices.find(voice => voice.lang.startsWith('vi'));
//         if (vietnameseVoice) {
//           setSelectedVoice(vietnameseVoice);
//         } else if (availableVoices.length > 0) {
//           setSelectedVoice(availableVoices[0]); // Chọn giọng mặc định nếu không có TV
//         }
//       };

//       // Sự kiện voiceschanged có thể không được kích hoạt ngay, nên gọi trực tiếp
//       loadVoices();
//       if (synth.onvoiceschanged !== undefined) {
//         synth.onvoiceschanged = loadVoices;
//       }
//     } else {
//       console.warn("Web Speech API (SpeechSynthesis) is not supported in this browser.");
//     }
//   }, []);


//   const speakText = (textToSpeak: string) => {
//     if (speechSynthesis && textToSpeak) {
//       // Hủy bỏ bất kỳ lượt nói nào đang diễn ra
//       speechSynthesis.cancel();

//       const utterance = new SpeechSynthesisUtterance(textToSpeak);

//       // Cấu hình cho utterance (tùy chọn)
//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//       }
//       // utterance.pitch = 1; // 0 đến 2, mặc định 1
//       // utterance.rate = 1; // 0.1 đến 10, mặc định 1
//       // utterance.volume = 1; // 0 đến 1, mặc định 1

//       speechSynthesis.speak(utterance);
//     }
//   };

//   const handleEmojiClick = (message: string) => {
//     setCurrentMessage(message);
//     speakText(message); // Gọi hàm phát âm thanh
//   };

//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
//       <aside className="w-full md:w-48 lg:w-60 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto">
//         <Link
//           href="/"
//           className="w-full mb-0 md:mb-4 flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky md:static top-0 left-0 z-10"
//         >
//           🏠
//           <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
//         </Link>

//         {/* Tùy chọn: Thêm dropdown để chọn giọng nói */}
//         {voices.length > 0 && speechSynthesis && (
//           <div className="my-2">
//             <label htmlFor="voice-select" className="text-sm text-gray-600 block mb-1">Chọn giọng đọc:</label>
//             <select
//               id="voice-select"
//               value={selectedVoice ? selectedVoice.name : ''}
//               onChange={(e) => {
//                 const voiceName = e.target.value;
//                 const voice = voices.find(v => v.name === voiceName);
//                 if (voice) setSelectedVoice(voice);
//               }}
//               className="w-full p-2 border border-gray-300 rounded-md text-sm"
//             >
//               {voices.map(voice => (
//                 <option key={voice.name} value={voice.name}>
//                   {voice.name} ({voice.lang})
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}


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
// src/components/needboard/NeedBoard.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- Định nghĩa Interface và Dữ liệu (categories đã cập nhật như trên) ---
interface WordPiece {
  id: string;
  emoji?: string;
  text: string;
  isAction?: boolean;
}

interface Category {
  name: string;
  items: WordPiece[];
}

const categories: Category[] = [ // Dán nội dung categories đã cập nhật ở Bước 1 vào đây
  {
    name: "Câu Giao Tiếp Thông Dụng",
    items: [
        { id: "full_hungry", emoji: "😋", text: "Tôi đói rồi. Tôi muốn ăn!", isAction: true },
        { id: "full_thirsty", emoji: "🥤", text: "Tôi khát nước. Tôi muốn uống!", isAction: true },
        { id: "full_toilet", emoji: "🚽", text: "Tôi muốn đi vệ sinh.", isAction: true },
        { id: "full_sleepy", emoji: "😴", text: "Tôi buồn ngủ. Tôi muốn đi ngủ.", isAction: true },
        { id: "full_happy", emoji: "😃", text: "Tôi cảm thấy rất vui!", isAction: true },
        { id: "full_sad", emoji: "😢", text: "Tôi đang buồn.", isAction: true },
        { id: "full_thankyou", emoji: "🙏", text: "Cảm ơn bạn nhiều!", isAction: true },
        { id: "full_yes", emoji: "👍", text: "Vâng, đúng vậy.", isAction: true },
        { id: "full_no", emoji: "👎", text: "Không, tôi không nghĩ vậy.", isAction: true },
        { id: "full_helpme", emoji: "🆘", text: "Làm ơn giúp tôi với!", isAction: true },
        { id: "full_whatyourname", emoji: "❓", text: "Bạn tên là gì?", isAction: true },
        { id: "full_howareyou", emoji: "🤔", text: "Bạn có khỏe không?", isAction: true },
        { id: "full_goodbye", emoji: "👋", text: "Tạm biệt nhé!", isAction: true },
        { id: "full_iloveyou", emoji: "❤️", text: "Tôi yêu bạn.", isAction: true },
        { id: "full_sorry", emoji: "😔", text: "Tôi xin lỗi.", isAction: true },
    ]
  },
  {
    name: "Chủ ngữ / Đại từ",
    items: [
      { id: "i", emoji: "👤", text: "Tôi" }, { id: "you", emoji: "👉", text: "Bạn" },
      { id: "he", emoji: "👨", text: "Anh ấy" }, { id: "she", emoji: "👩", text: "Cô ấy" },
      { id: "we", emoji: "👥", text: "Chúng tôi" }, { id: "they", emoji: "👨‍👩‍👧‍👦", text: "Họ" },
    ],
  },
  {
    name: "Động từ mong muốn / Trạng thái",
    items: [
      { id: "want", emoji: "🙋", text: "muốn" }, { id: "need", emoji: "❗", text: "cần" },
      { id: "like", emoji: "👍", text: "thích" }, { id: "feel", emoji: "💭", text: "cảm thấy" },
      { id: "am", emoji: "➡️", text: "là" }, { id: "can", emoji: "💪", text: "có thể" },
    ],
  },
  {
    name: "Hành động / Nhu cầu",
    items: [
      { id: "eat", emoji: "🍽️", text: "ăn", isAction: true }, { id: "drink", emoji: "🥤", text: "uống", isAction: true },
      { id: "go_to", emoji: "➡️🚽", text: "đi đến" }, { id: "toilet_noun", emoji: "🚽", text: "nhà vệ sinh" }, // Đổi id để tránh trùng
      { id: "sleep", emoji: "🛏️", text: "ngủ", isAction: true }, { id: "play", emoji: "🎮", text: "chơi", isAction: true },
      { id: "watch", emoji: "👀", text: "xem" }, { id: "read", emoji: "📖", text: "đọc" },
      { id: "help_verb", emoji: "🤝", text: "giúp đỡ" },
    ],
  },
  {
    name: "Cảm xúc (Từ đơn)",
    items: [
      { id: "adj_happy", emoji: "😊", text: "vui" }, { id: "adj_sad", emoji: "😟", text: "buồn" },
      { id: "adj_angry", emoji: "😠", text: "tức giận" }, { id: "adj_tired", emoji: "😩", text: "mệt" },
      { id: "adj_hungry_single", emoji: "🍽️❓", text: "đói" }, { id: "adj_thirsty_single", emoji: "💧❓", text: "khát" },
    ],
  },
  {
    name: "Sức khỏe (Từ đơn)",
    items: [
      { id: "adj_sick", emoji: "🤒", text: "ốm" }, { id: "doctor_noun", emoji: "👨‍⚕️", text: "bác sĩ" },
      { id: "medicine", emoji: "💊", text: "thuốc" },
    ],
  },
  {
    name: "Danh từ / Đối tượng / Địa điểm",
    items: [
      { id: "water", emoji: "💧", text: "nước" }, { id: "food", emoji: "🍎", text: "đồ ăn" },
      { id: "home", emoji: "🏠", text: "nhà" }, { id: "book", emoji: "📚", text: "sách" },
      { id: "tv_noun", emoji: "📺", text: "TV" }, { id: "game_noun", emoji: "🎲", text: "trò chơi" },
      { id: "school", emoji: "🏫", text: "trường học" }, { id: "park", emoji: "🌳", text: "công viên" },
    ],
  },
  {
    name: "Từ nối / Giới từ / Thời gian",
    items: [
        {id: "and", emoji: "➕", text: "và"}, {id: "or", emoji: "➗", text: "hoặc"},
        {id: "with", emoji: "🧑‍🤝‍🧑", text: "với"}, {id: "now", emoji: "⏰", text: "bây giờ"},
        {id: "later", emoji: "⏳", text: "lát nữa"}, {id: "please", emoji: "🙏", text: "làm ơn"},
    ]
  }
];
// --- Kết thúc định nghĩa Interface và Dữ liệu ---


export default function NeedBoard() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [constructedSentence, setConstructedSentence] = useState<WordPiece[]>([]);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      const loadVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
        const vietnameseVoice = availableVoices.find(voice => voice.lang.startsWith('vi'));
        if (vietnameseVoice) setSelectedVoice(vietnameseVoice);
        else if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
      };
      loadVoices();
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
    } else {
      console.warn("Web Speech API (SpeechSynthesis) is not supported.");
    }
  }, []);

  const speakText = (textToSpeak: string) => {
    if (speechSynthesis && textToSpeak) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (selectedVoice) utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    }
  };

  const handleWordPieceClick = (item: WordPiece) => {
    if (item.isAction) {
      if (constructedSentence.length > 0) {
        const finalSentenceArray = [...constructedSentence, item];
        const sentenceText = finalSentenceArray.map(p => p.text).join(" ");
        setCurrentMessage(sentenceText);
        speakText(sentenceText);
        setConstructedSentence([]);
      } else {
        setCurrentMessage(item.text);
        speakText(item.text);
        setConstructedSentence([]);
      }
    } else {
      const newSentenceArray = [...constructedSentence, item];
      setConstructedSentence(newSentenceArray);
      const sentenceText = newSentenceArray.map(p => p.text).join(" ");
      setCurrentMessage(sentenceText);
    }
  };

  const handleSpeakConstructedSentence = () => {
    const sentenceText = constructedSentence.map(p => p.text).join(" ");
    if (sentenceText) {
      setCurrentMessage(sentenceText);
      speakText(sentenceText);
      // Optional: clear sentence after speaking
      // setConstructedSentence([]);
    }
  };

  const handleClearSentence = () => {
    setConstructedSentence([]);
    setCurrentMessage("");
    if (speechSynthesis) speechSynthesis.cancel();
  };

  const handleBackspace = () => {
    if (constructedSentence.length > 0) {
      const newSentenceArray = constructedSentence.slice(0, -1);
      setConstructedSentence(newSentenceArray);
      const sentenceText = newSentenceArray.map(p => p.text).join(" ");
      setCurrentMessage(sentenceText);
    }
  };


  return (
    // JSX (phần giao diện) giữ nguyên như phiên bản trước,
    // nó sẽ tự động render các categories mới và các items trong đó.
    // Chỉ cần đảm bảo bạn đã cập nhật const `categories` ở trên.
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <aside className="w-full md:w-72 lg:w-80 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-col gap-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 100px)'}}>
        <Link
          href="/"
          className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky top-0 z-20"
        >
          🏠
          <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
        </Link>

        {voices.length > 0 && speechSynthesis && (
          <div className="my-1 sticky top-[70px] z-20 bg-slate-100 py-2">
            <label htmlFor="voice-select" className="text-xs text-gray-600 block mb-1">Giọng đọc:</label>
            <select
              id="voice-select"
              value={selectedVoice ? selectedVoice.name : ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                if (voice) setSelectedVoice(voice);
              }}
              className="w-full p-1.5 border border-gray-300 rounded-md text-xs"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name.length > 30 ? voice.name.substring(0,27) + '...' : voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Danh sách các danh mục */}
        {categories.map(category => (
          <div key={category.name} className="mb-3">
            {/* Điều chỉnh vị trí sticky top cho tên category nếu cần, dựa vào chiều cao của Link và Voice Select */}
            <h3 className="text-md font-semibold text-gray-700 mb-2 sticky top-[calc(70px+50px)] z-10 bg-slate-100 py-1"> {/* Ví dụ: 70px (Link) + 50px (Voice select ước lượng) */}
              {category.name}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleWordPieceClick(item)}
                  className="flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-sky-100 hover:shadow-md transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 aspect-square"
                  title={item.text}
                >
                  {item.emoji && <span className="text-3xl md:text-4xl mb-1">{item.emoji}</span>}
                  <span className={`text-xs text-center ${!item.emoji && item.text.length < 10 ? 'py-3 text-sm' : 'text-xs'}`}>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Content Area for Message and Controls */}
      <main className="flex-grow flex flex-col p-6 bg-gray-50 rounded-lg">
        <div
          id="message-display"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-700 break-words mb-6 p-4 border border-gray-300 rounded-lg bg-white min-h-[100px] flex items-center justify-center"
          style={{ lineHeight: '1.4' }}
        >
          {currentMessage || "Hãy chọn các biểu tượng để tạo câu..."}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
          <button
            onClick={handleSpeakConstructedSentence}
            disabled={constructedSentence.length === 0}
            className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
          >
            <span className="text-2xl">🔊</span> Nói
          </button>
          <button
            onClick={handleBackspace}
            disabled={constructedSentence.length === 0}
            className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
          >
             <span className="text-2xl">⬅️</span> Xóa lùi
          </button>
          <button
            onClick={handleClearSentence}
            disabled={constructedSentence.length === 0 && !currentMessage}
            className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
          >
            <span className="text-2xl">❌</span> Xóa hết
          </button>
        </div>

        {constructedSentence.length > 0 && (
          <div className="mt-4 p-3 border-t border-gray-300">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Câu đang ghép:</h4>
            <div className="flex flex-wrap gap-2">
              {constructedSentence.map((piece, index) => (
                <span key={`${piece.id}-${index}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center">
                  {piece.emoji && <span className="mr-1">{piece.emoji}</span>}
                  {piece.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
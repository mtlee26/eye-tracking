"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GazeButton from "../gazeButton";
import { ArrowLeft, RotateCcw, ArrowBigLeft, ArrowBigRight, Home, ChevronUp, ChevronDown } from "lucide-react";

// --- Định nghĩa Interface và Dữ liệu ---
interface WordPiece {
  id: string;
  emoji?: string;
  text: string;
  isAction?: boolean;
}

interface Category {
  name: string;
  items: WordPiece[];
  mode?: "full" | "construct" | "both";
}

const allCategories: Category[] = [
  {
    name: "Câu Giao Tiếp Thông Dụng",
    mode: "full",
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
    ],
  },
  {
    name: "Chủ ngữ / Đại từ",
    mode: "construct",
    items: [
      { id: "i", emoji: "👤", text: "Tôi" },
      { id: "you", emoji: "👉", text: "Bạn" },
      { id: "he", emoji: "👨", text: "Anh ấy" },
      { id: "she", emoji: "👩", text: "Cô ấy" },
      { id: "we", emoji: "👥", text: "Chúng tôi" },
      { id: "they", emoji: "👨‍👩‍👧‍👦", text: "Họ" },
    ],
  },
  {
    name: "Động từ mong muốn / Trạng thái",
    mode: "construct",
    items: [
      { id: "want", emoji: "🙋", text: "muốn" },
      { id: "need", emoji: "❗", text: "cần" },
      { id: "like", emoji: "👍", text: "thích" },
      { id: "feel", emoji: "💭", text: "cảm thấy" },
      { id: "am", emoji: "➡️", text: "là" },
      { id: "can", emoji: "💪", text: "có thể" },
    ],
  },
  {
    name: "Hành động / Nhu cầu",
    mode: "both",
    items: [
      { id: "eat", emoji: "🍽️", text: "ăn", isAction: true },
      { id: "drink", emoji: "🥤", text: "uống", isAction: true },
      { id: "go_to", emoji: "➡️🚽", text: "đi đến" },
      { id: "toilet_noun", emoji: "🚽", text: "nhà vệ sinh" },
      { id: "sleep", emoji: "🛏️", text: "ngủ", isAction: true },
      { id: "play", emoji: "🎮", text: "chơi", isAction: true },
      { id: "watch", emoji: "👀", text: "xem" },
      { id: "read", emoji: "📖", text: "đọc" },
      { id: "help_verb", emoji: "🤝", text: "giúp đỡ" },
    ],
  },
  {
    name: "Cảm xúc (Từ đơn)",
    mode: "construct",
    items: [
      { id: "adj_happy", emoji: "😊", text: "vui" },
      { id: "adj_sad", emoji: "😟", text: "buồn" },
      { id: "adj_angry", emoji: "😠", text: "tức giận" },
      { id: "adj_tired", emoji: "😩", text: "mệt" },
      { id: "adj_hungry_single", emoji: "🍽️❓", text: "đói" },
      { id: "adj_thirsty_single", emoji: "💧❓", text: "khát" },
    ],
  },
  {
    name: "Sức khỏe (Từ đơn)",
    mode: "construct",
    items: [
      { id: "adj_sick", emoji: "🤒", text: "ốm" },
      { id: "doctor_noun", emoji: "👨‍⚕️", text: "bác sĩ" },
      { id: "medicine", emoji: "💊", text: "thuốc" },
    ],
  },
  {
    name: "Danh từ / Đối tượng / Địa điểm",
    mode: "construct",
    items: [
      { id: "water", emoji: "💧", text: "nước" },
      { id: "food", emoji: "🍎", text: "đồ ăn" },
      { id: "home", emoji: "🏠", text: "nhà" },
      { id: "book", emoji: "📚", text: "sách" },
      { id: "tv_noun", emoji: "📺", text: "TV" },
      { id: "game_noun", emoji: "🎲", text: "trò chơi" },
      { id: "school", emoji: "🏫", text: "trường học" },
      { id: "park", emoji: "🌳", text: "công viên" },
    ],
  },
  {
    name: "Từ nối / Giới từ / Thời gian",
    mode: "construct",
    items: [
      { id: "and", emoji: "➕", text: "và" },
      { id: "or", emoji: "➗", text: "hoặc" },
      { id: "with", emoji: "🧑‍🤝‍🧑", text: "với" },
      { id: "now", emoji: "⏰", text: "bây giờ" },
      { id: "later", emoji: "⏳", text: "lát nữa" },
      { id: "please", emoji: "🙏", text: "làm ơn" },
    ],
  },
];
// --- Kết thúc định nghĩa Interface và Dữ liệu ---

type DisplayMode = "fullSentence" | "sentenceConstructor";

export default function NeedBoard() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [constructedSentence, setConstructedSentence] = useState<WordPiece[]>([]);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("fullSentence");
  const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const AUTO_CLICK_DELAY = 2000; // 2 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const emojiContainerRef = useRef<HTMLDivElement>(null); // Ref for the emoji section

  const HOME_BUTTON_HEIGHT = 70;
  const MODE_BUTTON_HEIGHT = 50;
  const VOICE_SELECT_HEIGHT = 60;

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      const loadVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
        const vietnameseVoice = availableVoices.find((voice) => voice.lang.startsWith("vi"));
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
    if (displayMode === "fullSentence" || item.isAction) {
      if (displayMode === "sentenceConstructor" && constructedSentence.length > 0 && item.isAction) {
        const finalSentenceArray = [...constructedSentence, item];
        const sentenceText = finalSentenceArray.map((p) => p.text).join(" ");
        setCurrentMessage(sentenceText);
        speakText(sentenceText);
        setConstructedSentence([]);
      } else {
        setCurrentMessage(item.text);
        speakText(item.text);
        setConstructedSentence([]);
      }
    } else if (displayMode === "sentenceConstructor" && !item.isAction) {
      const newSentenceArray = [...constructedSentence, item];
      setConstructedSentence(newSentenceArray);
      const sentenceText = newSentenceArray.map((p) => p.text).join(" ");
      setCurrentMessage(sentenceText);
    }
  };

  const handleSpeakConstructedSentence = () => {
    const sentenceText = constructedSentence.map((p) => p.text).join(" ");
    if (sentenceText) {
      setCurrentMessage(sentenceText);
      speakText(sentenceText);
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
      const sentenceText = newSentenceArray.map((p) => p.text).join(" ");
      setCurrentMessage(sentenceText);
    }
  };

  // Function to handle scroll up
  const handleScrollUp = () => {
    if (emojiContainerRef.current) {
      emojiContainerRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  // Function to handle scroll down
  const handleScrollDown = () => {
    if (emojiContainerRef.current) {
      emojiContainerRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!hoveredElement) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress({});
      return;
    }

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / AUTO_CLICK_DELAY) * 100;
      setProgress((prev) => ({
        ...prev,
        [hoveredElement]: Math.min(progressPercent, 100),
      }));

      if (elapsed >= AUTO_CLICK_DELAY) {
        if (hoveredElement === "homeButton") {
          window.location.href = "/";
        } else if (hoveredElement === "fullSentenceMode") {
          setDisplayMode("fullSentence");
          setConstructedSentence([]);
          setCurrentMessage("");
          setIsVoiceSelectorOpen(false);
        } else if (hoveredElement === "sentenceConstructorMode") {
          setDisplayMode("sentenceConstructor");
          setConstructedSentence([]);
          setCurrentMessage("");
          setIsVoiceSelectorOpen(false);
        } else if (hoveredElement === "voiceSelector") {
          setIsVoiceSelectorOpen(!isVoiceSelectorOpen);
        } else if (hoveredElement.startsWith("voiceOption-")) {
          const voiceName = hoveredElement.replace("voiceOption-", "");
          const voice = voices.find((v) => v.name === voiceName);
          if (voice) {
            setSelectedVoice(voice);
            setIsVoiceSelectorOpen(false);
          }
        } else if (hoveredElement.startsWith("wordPiece-")) {
          const itemId = hoveredElement.replace("wordPiece-", "");
          const item = allCategories
            .flatMap((category) => category.items)
            .find((i) => i.id === itemId);
          if (item) {
            handleWordPieceClick(item);
            setIsVoiceSelectorOpen(false);
          }
        } else if (hoveredElement === "speakButton") {
          handleSpeakConstructedSentence();
          setIsVoiceSelectorOpen(false);
        } else if (hoveredElement === "backspaceButton") {
          handleBackspace();
          setIsVoiceSelectorOpen(false);
        } else if (hoveredElement === "clearButton") {
          handleClearSentence();
          setIsVoiceSelectorOpen(false);
        } else if (hoveredElement === "scrollUpButton") {
          handleScrollUp();
        } else if (hoveredElement === "scrollDownButton") {
          handleScrollDown();
        }

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setProgress((prev) => ({ ...prev, [hoveredElement]: 0 }));
        setHoveredElement(null);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    hoveredElement,
    voices,
    constructedSentence,
    displayMode,
    isVoiceSelectorOpen,
  ]);

  const currentCategories = allCategories.filter((category) => {
    if (displayMode === "fullSentence") {
      return category.mode === "full" || category.mode === "both";
    }
    if (displayMode === "sentenceConstructor") {
      return category.mode === "construct" || category.mode === "both";
    }
    return true;
  });

  const modeButtonTop = `${HOME_BUTTON_HEIGHT}px`;
  const voiceSelectTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT}px`;
  const categoryTitleTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT + VOICE_SELECT_HEIGHT}px`;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <aside className="w-full md:w-100 lg:w-100 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-col gap-4">
        {/* Scroll Buttons (Left side) */}
        <div className="hidden md:flex flex-col gap-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="relative">
            <GazeButton
              onMouseEnter={() => setHoveredElement("scrollUpButton")}
              onMouseLeave={() => setHoveredElement(null)}
              onClick={() => {}} // Placeholder for TypeScript
              className="p-3 bg-gray-400 text-white rounded-full hover:bg-gray-700 transition-colors text-2xl shadow-lg"
            >
              <ChevronUp size={32}/>
            </GazeButton>
            {hoveredElement === "scrollUpButton" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                style={{
                  width: `${progress["scrollUpButton"] || 0}%`,
                }}
              />
            )}
          </div>
          <div className="relative">
            <GazeButton
              onMouseEnter={() => setHoveredElement("scrollDownButton")}
              onMouseLeave={() => setHoveredElement(null)}
              onClick={() => {}} // Placeholder for TypeScript
              className="p-3 bg-gray-400 text-white rounded-full hover:bg-gray-700 transition-colors text-2xl shadow-lg"
            >
              <ChevronDown size={32}/>
            </GazeButton>
            {hoveredElement === "scrollDownButton" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                style={{
                  width: `${progress["scrollDownButton"] || 0}%`,
                }}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <GazeButton
            onMouseEnter={() => setHoveredElement("homeButton")}
            onMouseLeave={() => setHoveredElement(null)}
            onClick={() => {}} // Placeholder for TypeScript
            className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky top-0 z-30"
            style={{ height: `${HOME_BUTTON_HEIGHT}px` }}
          >
            🏠
            <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
          </GazeButton>
          {hoveredElement === "homeButton" && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
              style={{
                width: `${progress["homeButton"] || 0}%`,
              }}
            />
          )}
        </div>

        <div className="sticky z-30 bg-slate-100 py-2 flex gap-2" style={{ top: modeButtonTop, height: `${MODE_BUTTON_HEIGHT}px` }}>
          <div className="relative flex-1">
            <GazeButton
              onMouseEnter={() => setHoveredElement("fullSentenceMode")}
              onMouseLeave={() => setHoveredElement(null)}
              onClick={() => {}} // Placeholder for TypeScript
              className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors ${
                displayMode === "fullSentence"
                  ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Câu Đầy Đủ
            </GazeButton>
            {hoveredElement === "fullSentenceMode" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                style={{
                  width: `${progress["fullSentenceMode"] || 0}%`,
                }}
              />
            )}
          </div>
          <div className="relative flex-1">
            <GazeButton
              onMouseEnter={() => setHoveredElement("sentenceConstructorMode")}
              onMouseLeave={() => setHoveredElement(null)}
              onClick={() => {}} // Placeholder for TypeScript
              className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors ${
                displayMode === "sentenceConstructor"
                  ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Ghép Câu
            </GazeButton>
            {hoveredElement === "sentenceConstructorMode" && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                style={{
                  width: `${progress["sentenceConstructorMode"] || 0}%`,
                }}
              />
            )}
          </div>
        </div>

        {voices.length > 0 && speechSynthesis && (
          <div className="relative my-1 sticky z-20 bg-slate-100 py-2" style={{ top: voiceSelectTop }}>
            <div className="relative">
              <GazeButton
                onMouseEnter={() => setHoveredElement("voiceSelector")}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => {}} // Placeholder for TypeScript
                className="w-full p-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex justify-between items-center"
                style={{ height: `${VOICE_SELECT_HEIGHT}px` }}
                aria-expanded={isVoiceSelectorOpen}
                aria-haspopup="listbox"
                aria-controls="voice-options-list"
              >
                <span className="truncate">
                  Giọng: {selectedVoice ? (selectedVoice.name.length > 20 ? selectedVoice.name.substring(0, 17) + "..." : selectedVoice.name) + ` (${selectedVoice.lang})` : "Mặc định"}
                </span>
                <span className="text-xs ml-2">{isVoiceSelectorOpen ? "▲" : "▼"}</span>
              </GazeButton>
              {hoveredElement === "voiceSelector" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                  style={{
                    width: `${progress["voiceSelector"] || 0}%`,
                  }}
                />
              )}
            </div>

            {isVoiceSelectorOpen && (
              <div
                id="voice-options-list"
                role="listbox"
                className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto z-40"
              >
                {voices.map((voice) => (
                  <div key={voice.name} className="relative">
                    <GazeButton
                      onMouseEnter={() => setHoveredElement(`voiceOption-${voice.name}`)}
                      onMouseLeave={() => setHoveredElement(null)}
                      onClick={() => {}} // Placeholder for TypeScript
                      className={`w-full p-2.5 text-left text-xs hover:bg-sky-100 ${
                        selectedVoice && selectedVoice.name === voice.name ? "bg-sky-200 font-semibold" : "bg-white"
                      }`}
                      role="option"
                      aria-selected={selectedVoice?.name === voice.name}
                    >
                      {voice.name.length > 35 ? voice.name.substring(0, 32) + "..." : voice.name} ({voice.lang})
                    </GazeButton>
                    {hoveredElement === `voiceOption-${voice.name}` && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                        style={{
                          width: `${progress[`voiceOption-${voice.name}`] || 0}%`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scrollable Emoji Section */}
        <div
          ref={emojiContainerRef}
          className="flex-1 overflow-y-auto"
          style={{ maxHeight: `calc(100vh - ${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT + VOICE_SELECT_HEIGHT + 40}px)` }}
        >
          {currentCategories.map((category) => (
            <div key={category.name} className="mb-3">
              <h3 className="text-md font-semibold text-gray-700 mb-2 sticky z-10 bg-slate-100 py-1" style={{ top: 0 }}>
                {category.name}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {category.items.map((item) => (
                  <div key={item.id} className="relative">
                    <GazeButton
                      onMouseEnter={() => setHoveredElement(`wordPiece-${item.id}`)}
                      onMouseLeave={() => setHoveredElement(null)}
                      onClick={() => {}} // Placeholder for TypeScript
                      className="flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 aspect-square"
                      title={item.text}
                    >
                      {item.emoji && <span className="text-3xl md:text-4xl mb-1">{item.emoji}</span>}
                      <span className={`text-xs text-center ${!item.emoji && item.text.length < 10 ? "py-3 text-sm" : "text-xs"}`}>{item.text}</span>
                    </GazeButton>
                    {hoveredElement === `wordPiece-${item.id}` && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                        style={{
                          width: `${progress[`wordPiece-${item.id}`] || 0}%`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-grow flex flex-col p-6 bg-gray-50 rounded-lg">
        <div
          id="message-display"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-700 break-words mb-6 p-6 border-2 border-gray-400 rounded-lg bg-white min-h-[180px] flex items-center justify-center shadow-md"
          style={{ lineHeight: "1.5" }}
        >
          {currentMessage || (displayMode === "sentenceConstructor" ? "Hãy chọn các biểu tượng để tạo câu..." : "Chọn một câu có sẵn...")}
        </div>

        {displayMode === "sentenceConstructor" && (
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <div className="relative">
              <GazeButton
                onMouseEnter={() => setHoveredElement("speakButton")}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => {}} // Placeholder for TypeScript
                disabled={constructedSentence.length === 0}
                className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
              >
                <span className="text-2xl">🔊</span> Nói
              </GazeButton>
              {hoveredElement === "speakButton" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                  style={{
                    width: `${progress["speakButton"] || 0}%`,
                  }}
                />
              )}
            </div>
            <div className="relative">
              <GazeButton
                onMouseEnter={() => setHoveredElement("backspaceButton")}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => {}} // Placeholder for TypeScript
                disabled={constructedSentence.length === 0}
                className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
              >
                <span className="text-2xl">⬅️</span> Xóa lùi
              </GazeButton>
              {hoveredElement === "backspaceButton" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                  style={{
                    width: `${progress["backspaceButton"] || 0}%`,
                  }}
                />
              )}
            </div>
            <div className="relative">
              <GazeButton
                onMouseEnter={() => setHoveredElement("clearButton")}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => {}} // Placeholder for TypeScript
                disabled={constructedSentence.length === 0 && !currentMessage}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
              >
                <span className="text-2xl">❌</span> Xóa hết
              </GazeButton>
              {hoveredElement === "clearButton" && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
                  style={{
                    width: `${progress["clearButton"] || 0}%`,
                  }}
                />
              )}
            </div>
          </div>
        )}

        {displayMode === "sentenceConstructor" && constructedSentence.length > 0 && (
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













// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import GazeButton from "../gazeButton";
// import { ArrowLeft, RotateCcw, ArrowBigLeft, ArrowBigRight, Home } from "lucide-react";

// // --- Định nghĩa Interface và Dữ liệu ---
// interface WordPiece {
//   id: string;
//   emoji?: string;
//   text: string;
//   isAction?: boolean;
// }

// interface Category {
//   name: string;
//   items: WordPiece[];
//   mode?: "full" | "construct" | "both";
// }

// const allCategories: Category[] = [
//   {
//     name: "Câu Giao Tiếp Thông Dụng",
//     mode: "full",
//     items: [
//       { id: "full_hungry", emoji: "😋", text: "Tôi đói rồi. Tôi muốn ăn!", isAction: true },
//       { id: "full_thirsty", emoji: "🥤", text: "Tôi khát nước. Tôi muốn uống!", isAction: true },
//       { id: "full_toilet", emoji: "🚽", text: "Tôi muốn đi vệ sinh.", isAction: true },
//       { id: "full_sleepy", emoji: "😴", text: "Tôi buồn ngủ. Tôi muốn đi ngủ.", isAction: true },
//       { id: "full_happy", emoji: "😃", text: "Tôi cảm thấy rất vui!", isAction: true },
//       { id: "full_sad", emoji: "😢", text: "Tôi đang buồn.", isAction: true },
//       { id: "full_thankyou", emoji: "🙏", text: "Cảm ơn bạn nhiều!", isAction: true },
//       { id: "full_yes", emoji: "👍", text: "Vâng, đúng vậy.", isAction: true },
//       { id: "full_no", emoji: "👎", text: "Không, tôi không nghĩ vậy.", isAction: true },
//       { id: "full_helpme", emoji: "🆘", text: "Làm ơn giúp tôi với!", isAction: true },
//       { id: "full_whatyourname", emoji: "❓", text: "Bạn tên là gì?", isAction: true },
//       { id: "full_howareyou", emoji: "🤔", text: "Bạn có khỏe không?", isAction: true },
//       { id: "full_goodbye", emoji: "👋", text: "Tạm biệt nhé!", isAction: true },
//       { id: "full_iloveyou", emoji: "❤️", text: "Tôi yêu bạn.", isAction: true },
//       { id: "full_sorry", emoji: "😔", text: "Tôi xin lỗi.", isAction: true },
//     ],
//   },
//   {
//     name: "Chủ ngữ / Đại từ",
//     mode: "construct",
//     items: [
//       { id: "i", emoji: "👤", text: "Tôi" },
//       { id: "you", emoji: "👉", text: "Bạn" },
//       { id: "he", emoji: "👨", text: "Anh ấy" },
//       { id: "she", emoji: "👩", text: "Cô ấy" },
//       { id: "we", emoji: "👥", text: "Chúng tôi" },
//       { id: "they", emoji: "👨‍👩‍👧‍👦", text: "Họ" },
//     ],
//   },
//   {
//     name: "Động từ mong muốn / Trạng thái",
//     mode: "construct",
//     items: [
//       { id: "want", emoji: "🙋", text: "muốn" },
//       { id: "need", emoji: "❗", text: "cần" },
//       { id: "like", emoji: "👍", text: "thích" },
//       { id: "feel", emoji: "💭", text: "cảm thấy" },
//       { id: "am", emoji: "➡️", text: "là" },
//       { id: "can", emoji: "💪", text: "có thể" },
//     ],
//   },
//   {
//     name: "Hành động / Nhu cầu",
//     mode: "both",
//     items: [
//       { id: "eat", emoji: "🍽️", text: "ăn", isAction: true },
//       { id: "drink", emoji: "🥤", text: "uống", isAction: true },
//       { id: "go_to", emoji: "➡️🚽", text: "đi đến" },
//       { id: "toilet_noun", emoji: "🚽", text: "nhà vệ sinh" },
//       { id: "sleep", emoji: "🛏️", text: "ngủ", isAction: true },
//       { id: "play", emoji: "🎮", text: "chơi", isAction: true },
//       { id: "watch", emoji: "👀", text: "xem" },
//       { id: "read", emoji: "📖", text: "đọc" },
//       { id: "help_verb", emoji: "🤝", text: "giúp đỡ" },
//     ],
//   },
//   {
//     name: "Cảm xúc (Từ đơn)",
//     mode: "construct",
//     items: [
//       { id: "adj_happy", emoji: "😊", text: "vui" },
//       { id: "adj_sad", emoji: "😟", text: "buồn" },
//       { id: "adj_angry", emoji: "😠", text: "tức giận" },
//       { id: "adj_tired", emoji: "😩", text: "mệt" },
//       { id: "adj_hungry_single", emoji: "🍽️❓", text: "đói" },
//       { id: "adj_thirsty_single", emoji: "💧❓", text: "khát" },
//     ],
//   },
//   {
//     name: "Sức khỏe (Từ đơn)",
//     mode: "construct",
//     items: [
//       { id: "adj_sick", emoji: "🤒", text: "ốm" },
//       { id: "doctor_noun", emoji: "👨‍⚕️", text: "bác sĩ" },
//       { id: "medicine", emoji: "💊", text: "thuốc" },
//     ],
//   },
//   {
//     name: "Danh từ / Đối tượng / Địa điểm",
//     mode: "construct",
//     items: [
//       { id: "water", emoji: "💧", text: "nước" },
//       { id: "food", emoji: "🍎", text: "đồ ăn" },
//       { id: "home", emoji: "🏠", text: "nhà" },
//       { id: "book", emoji: "📚", text: "sách" },
//       { id: "tv_noun", emoji: "📺", text: "TV" },
//       { id: "game_noun", emoji: "🎲", text: "trò chơi" },
//       { id: "school", emoji: "🏫", text: "trường học" },
//       { id: "park", emoji: "🌳", text: "công viên" },
//     ],
//   },
//   {
//     name: "Từ nối / Giới từ / Thời gian",
//     mode: "construct",
//     items: [
//       { id: "and", emoji: "➕", text: "và" },
//       { id: "or", emoji: "➗", text: "hoặc" },
//       { id: "with", emoji: "🧑‍🤝‍🧑", text: "với" },
//       { id: "now", emoji: "⏰", text: "bây giờ" },
//       { id: "later", emoji: "⏳", text: "lát nữa" },
//       { id: "please", emoji: "🙏", text: "làm ơn" },
//     ],
//   },
// ];
// // --- Kết thúc định nghĩa Interface và Dữ liệu ---

// type DisplayMode = "fullSentence" | "sentenceConstructor";

// export default function NeedBoard() {
//   const [currentMessage, setCurrentMessage] = useState<string>("");
//   const [constructedSentence, setConstructedSentence] = useState<WordPiece[]>([]);
//   const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
//   const [displayMode, setDisplayMode] = useState<DisplayMode>("fullSentence");
//   const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);
//   const [hoveredElement, setHoveredElement] = useState<string | null>(null);
//   const [progress, setProgress] = useState<Record<string, number>>({});
//   const AUTO_CLICK_DELAY = 2000; // 3 seconds
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const HOME_BUTTON_HEIGHT = 70;
//   const MODE_BUTTON_HEIGHT = 50;
//   const VOICE_SELECT_HEIGHT = 60;

//   useEffect(() => {
//     if (typeof window !== "undefined" && "speechSynthesis" in window) {
//       const synth = window.speechSynthesis;
//       setSpeechSynthesis(synth);
//       const loadVoices = () => {
//         const availableVoices = synth.getVoices();
//         setVoices(availableVoices);
//         const vietnameseVoice = availableVoices.find((voice) => voice.lang.startsWith("vi"));
//         if (vietnameseVoice) setSelectedVoice(vietnameseVoice);
//         else if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
//       };
//       loadVoices();
//       if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
//     } else {
//       console.warn("Web Speech API (SpeechSynthesis) is not supported.");
//     }
//   }, []);

//   const speakText = (textToSpeak: string) => {
//     if (speechSynthesis && textToSpeak) {
//       speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(textToSpeak);
//       if (selectedVoice) utterance.voice = selectedVoice;
//       speechSynthesis.speak(utterance);
//     }
//   };

//   const handleWordPieceClick = (item: WordPiece) => {
//     if (displayMode === "fullSentence" || item.isAction) {
//       if (displayMode === "sentenceConstructor" && constructedSentence.length > 0 && item.isAction) {
//         const finalSentenceArray = [...constructedSentence, item];
//         const sentenceText = finalSentenceArray.map((p) => p.text).join(" ");
//         setCurrentMessage(sentenceText);
//         speakText(sentenceText);
//         setConstructedSentence([]);
//       } else {
//         setCurrentMessage(item.text);
//         speakText(item.text);
//         setConstructedSentence([]);
//       }
//     } else if (displayMode === "sentenceConstructor" && !item.isAction) {
//       const newSentenceArray = [...constructedSentence, item];
//       setConstructedSentence(newSentenceArray);
//       const sentenceText = newSentenceArray.map((p) => p.text).join(" ");
//       setCurrentMessage(sentenceText);
//     }
//   };

//   const handleSpeakConstructedSentence = () => {
//     const sentenceText = constructedSentence.map((p) => p.text).join(" ");
//     if (sentenceText) {
//       setCurrentMessage(sentenceText);
//       speakText(sentenceText);
//     }
//   };

//   const handleClearSentence = () => {
//     setConstructedSentence([]);
//     setCurrentMessage("");
//     if (speechSynthesis) speechSynthesis.cancel();
//   };

//   const handleBackspace = () => {
//     if (constructedSentence.length > 0) {
//       const newSentenceArray = constructedSentence.slice(0, -1);
//       setConstructedSentence(newSentenceArray);
//       const sentenceText = newSentenceArray.map((p) => p.text).join(" ");
//       setCurrentMessage(sentenceText);
//     }
//   };

//   useEffect(() => {
//     if (!hoveredElement) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       setProgress({});
//       return;
//     }

//     const startTime = Date.now();
//     intervalRef.current = setInterval(() => {
//       const elapsed = Date.now() - startTime;
//       const progressPercent = (elapsed / AUTO_CLICK_DELAY) * 100;
//       setProgress((prev) => ({
//         ...prev,
//         [hoveredElement]: Math.min(progressPercent, 100),
//       }));

//       if (elapsed >= AUTO_CLICK_DELAY) {
//         if (hoveredElement === "homeButton") {
//           window.location.href = "/";
//         } else if (hoveredElement === "fullSentenceMode") {
//           setDisplayMode("fullSentence");
//           setConstructedSentence([]);
//           setCurrentMessage("");
//           setIsVoiceSelectorOpen(false);
//         } else if (hoveredElement === "sentenceConstructorMode") {
//           setDisplayMode("sentenceConstructor");
//           setConstructedSentence([]);
//           setCurrentMessage("");
//           setIsVoiceSelectorOpen(false);
//         } else if (hoveredElement === "voiceSelector") {
//           setIsVoiceSelectorOpen(!isVoiceSelectorOpen);
//         } else if (hoveredElement.startsWith("voiceOption-")) {
//           const voiceName = hoveredElement.replace("voiceOption-", "");
//           const voice = voices.find((v) => v.name === voiceName);
//           if (voice) {
//             setSelectedVoice(voice);
//             setIsVoiceSelectorOpen(false);
//           }
//         } else if (hoveredElement.startsWith("wordPiece-")) {
//           const itemId = hoveredElement.replace("wordPiece-", "");
//           const item = allCategories
//             .flatMap((category) => category.items)
//             .find((i) => i.id === itemId);
//           if (item) {
//             handleWordPieceClick(item);
//             setIsVoiceSelectorOpen(false);
//           }
//         } else if (hoveredElement === "speakButton") {
//           handleSpeakConstructedSentence();
//           setIsVoiceSelectorOpen(false);
//         } else if (hoveredElement === "backspaceButton") {
//           handleBackspace();
//           setIsVoiceSelectorOpen(false);
//         } else if (hoveredElement === "clearButton") {
//           handleClearSentence();
//           setIsVoiceSelectorOpen(false);
//         }

//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//         }
//         setProgress((prev) => ({ ...prev, [hoveredElement]: 0 }));
//         setHoveredElement(null);
//       }
//     }, 50);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [
//     hoveredElement,
//     voices,
//     constructedSentence,
//     displayMode,
//     isVoiceSelectorOpen,
//   ]);

//   const currentCategories = allCategories.filter((category) => {
//     if (displayMode === "fullSentence") {
//       return category.mode === "full" || category.mode === "both";
//     }
//     if (displayMode === "sentenceConstructor") {
//       return category.mode === "construct" || category.mode === "both";
//     }
//     return true;
//   });

//   const modeButtonTop = `${HOME_BUTTON_HEIGHT}px`;
//   const voiceSelectTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT}px`;
//   const categoryTitleTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT + VOICE_SELECT_HEIGHT}px`;

//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
//       <aside className="w-full md:w-72 lg:w-80 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-col gap-4">
//         <div className="relative">
//           <GazeButton
//             onMouseEnter={() => setHoveredElement("homeButton")}
//             onMouseLeave={() => setHoveredElement(null)}
//             onClick={() => {}} // Add default handler
//             className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky top-0 z-30"
//             style={{ height: `${HOME_BUTTON_HEIGHT}px` }}
//           >
//             🏠
//             <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
//           </GazeButton>
//           {hoveredElement === "homeButton" && (
//             <div
//               className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//               style={{
//                 width: `${progress["homeButton"] || 0}%`,
//               }}
//             />
//           )}
//         </div>

//         <div className="sticky z-30 bg-slate-100 py-2 flex gap-2" style={{ top: modeButtonTop, height: `${MODE_BUTTON_HEIGHT}px` }}>
//           <div className="relative flex-1">
//             <GazeButton
//               onMouseEnter={() => setHoveredElement("fullSentenceMode")}
//               onMouseLeave={() => setHoveredElement(null)}
//               onClick={() => {}} // Add default handler
//               className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors ${
//                 displayMode === "fullSentence"
//                   ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Câu Đầy Đủ
//             </GazeButton>
//             {hoveredElement === "fullSentenceMode" && (
//               <div
//                 className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                 style={{
//                   width: `${progress["fullSentenceMode"] || 0}%`,
//                 }}
//               />
//             )}
//           </div>
//           <div className="relative flex-1">
//             <GazeButton
//               onMouseEnter={() => setHoveredElement("sentenceConstructorMode")}
//               onMouseLeave={() => setHoveredElement(null)}
//               onClick={() => {}} // Add default handler
//               className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors ${
//                 displayMode === "sentenceConstructor"
//                   ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Ghép Câu
//             </GazeButton>
//             {hoveredElement === "sentenceConstructorMode" && (
//               <div
//                 className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                 style={{
//                   width: `${progress["sentenceConstructorMode"] || 0}%`,
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {voices.length > 0 && speechSynthesis && (
//           <div className="relative my-1 sticky z-20 bg-slate-100 py-2" style={{ top: voiceSelectTop }}>
//             <div className="relative">
//               <GazeButton
//                 onMouseEnter={() => setHoveredElement("voiceSelector")}
//                 onMouseLeave={() => setHoveredElement(null)}
//                 onClick={() => {}} // Add default handler
//                 className="w-full p-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex justify-between items-center"
//                 style={{ height: `${VOICE_SELECT_HEIGHT}px` }}
//                 aria-expanded={isVoiceSelectorOpen}
//                 aria-haspopup="listbox"
//                 aria-controls="voice-options-list"
//               >
//                 <span className="truncate">
//                   Giọng: {selectedVoice ? (selectedVoice.name.length > 20 ? selectedVoice.name.substring(0, 17) + "..." : selectedVoice.name) + ` (${selectedVoice.lang})` : "Mặc định"}
//                 </span>
//                 <span className="text-xs ml-2">{isVoiceSelectorOpen ? "▲" : "▼"}</span>
//               </GazeButton>
//               {hoveredElement === "voiceSelector" && (
//                 <div
//                   className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                   style={{
//                     width: `${progress["voiceSelector"] || 0}%`,
//                   }}
//                 />
//               )}
//             </div>

//             {isVoiceSelectorOpen && (
//               <div
//                 id="voice-options-list"
//                 role="listbox"
//                 className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto z-40"
//               >
//                 {voices.map((voice) => (
//                   <div key={voice.name} className="relative">
//                     <GazeButton
//                       onMouseEnter={() => setHoveredElement(`voiceOption-${voice.name}`)}
//                       onMouseLeave={() => setHoveredElement(null)}
//                       onClick={() => {}} // Add default handler
//                       className={`w-full p-2.5 text-left text-xs hover:bg-sky-100 ${
//                         selectedVoice && selectedVoice.name === voice.name ? "bg-sky-200 font-semibold" : "bg-white"
//                       }`}
//                       role="option"
//                       aria-selected={selectedVoice?.name === voice.name}
//                     >
//                       {voice.name.length > 35 ? voice.name.substring(0, 32) + "..." : voice.name} ({voice.lang})
//                     </GazeButton>
//                     {hoveredElement === `voiceOption-${voice.name}` && (
//                       <div
//                         className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                         style={{
//                           width: `${progress[`voiceOption-${voice.name}`] || 0}%`,
//                         }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {currentCategories.map((category) => (
//           <div key={category.name} className="mb-3">
//             <h3 className="text-md font-semibold text-gray-700 mb-2 sticky z-10 bg-slate-100 py-1" style={{ top: categoryTitleTop }}>
//               {category.name}
//             </h3>
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//               {category.items.map((item) => (
//                 <div key={item.id} className="relative">
//                   <GazeButton
//                     onMouseEnter={() => setHoveredElement(`wordPiece-${item.id}`)}
//                     onMouseLeave={() => setHoveredElement(null)}
//                     onClick={() => {}} // Add default handler
//                     className="flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 aspect-square"
//                     title={item.text}
//                   >
//                     {item.emoji && <span className="text-3xl md:text-4xl mb-1">{item.emoji}</span>}
//                     <span className={`text-xs text-center ${!item.emoji && item.text.length < 10 ? "py-3 text-sm" : "text-xs"}`}>{item.text}</span>
//                   </GazeButton>
//                   {hoveredElement === `wordPiece-${item.id}` && (
//                     <div
//                       className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                       style={{
//                         width: `${progress[`wordPiece-${item.id}`] || 0}%`,
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </aside>

//       <main className="flex-grow flex flex-col p-6 bg-gray-50 rounded-lg">
//         <div
//           id="message-display"
//           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-700 break-words mb-6 p-6 border-2 border-gray-400 rounded-lg bg-white min-h-[180px] flex items-center justify-center shadow-md"
//           style={{ lineHeight: "1.5" }}
//         >
//           {currentMessage || (displayMode === "sentenceConstructor" ? "Hãy chọn các biểu tượng để tạo câu..." : "Chọn một câu có sẵn...")}
//         </div>

//         {displayMode === "sentenceConstructor" && (
//           <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
//             <div className="relative">
//               <GazeButton
//                 onMouseEnter={() => setHoveredElement("speakButton")}
//                 onMouseLeave={() => setHoveredElement(null)}
//                 onClick={() => {}} // Add default handler
//                 disabled={constructedSentence.length === 0}
//                 className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//               >
//                 <span className="text-2xl">🔊</span> Nói
//               </GazeButton>
//               {hoveredElement === "speakButton" && (
//                 <div
//                   className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                   style={{
//                     width: `${progress["speakButton"] || 0}%`,
//                   }}
//                 />
//               )}
//             </div>
//             <div className="relative">
//               <GazeButton
//                 onMouseEnter={() => setHoveredElement("backspaceButton")}
//                 onMouseLeave={() => setHoveredElement(null)}
//                 onClick={() => {}} // Add default handler
//                 disabled={constructedSentence.length === 0}
//                 className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//               >
//                 <span className="text-2xl">⬅️</span> Xóa lùi
//               </GazeButton>
//               {hoveredElement === "backspaceButton" && (
//                 <div
//                   className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                   style={{
//                     width: `${progress["backspaceButton"] || 0}%`,
//                   }}
//                 />
//               )}
//             </div>
//             <div className="relative">
//               <GazeButton
//                 onMouseEnter={() => setHoveredElement("clearButton")}
//                 onMouseLeave={() => setHoveredElement(null)}
//                 onClick={() => {}} // Add default handler
//                 disabled={constructedSentence.length === 0 && !currentMessage}
//                 className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//               >
//                 <span className="text-2xl">❌</span> Xóa hết
//               </GazeButton>
//               {hoveredElement === "clearButton" && (
//                 <div
//                   className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-50 w-full"
//                   style={{
//                     width: `${progress["clearButton"] || 0}%`,
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         )}

//         {displayMode === "sentenceConstructor" && constructedSentence.length > 0 && (
//           <div className="mt-4 p-3 border-t border-gray-300">
//             <h4 className="text-sm font-semibold text-gray-600 mb-2">Câu đang ghép:</h4>
//             <div className="flex flex-wrap gap-2">
//               {constructedSentence.map((piece, index) => (
//                 <span key={`${piece.id}-${index}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center">
//                   {piece.emoji && <span className="mr-1">{piece.emoji}</span>}
//                   {piece.text}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






// // source component/needboard/NeedBoard.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link"; // Vẫn giữ Link nếu muốn dùng cho một số trường hợp khác GazeButton điều hướng
// import GazeButton from "../gazeButton"; // Đảm bảo đường dẫn này đúng
// import { ArrowLeft, RotateCcw, ArrowBigLeft, ArrowBigRight, Home } from "lucide-react";

// // --- Định nghĩa Interface và Dữ liệu ---
// interface WordPiece {
//   id: string;
//   emoji?: string;
//   text: string;
//   isAction?: boolean; // isAction: true nghĩa là câu/hành động hoàn chỉnh
// }

// interface Category {
//   name: string;
//   items: WordPiece[];
//   mode?: "full" | "construct" | "both"; // Thuộc tính mode cho category
// }

// const allCategories: Category[] = [
//   {
//     name: "Câu Giao Tiếp Thông Dụng",
//     mode: "full",
//     items: [
//         { id: "full_hungry", emoji: "😋", text: "Tôi đói rồi. Tôi muốn ăn!", isAction: true },
//         { id: "full_thirsty", emoji: "🥤", text: "Tôi khát nước. Tôi muốn uống!", isAction: true },
//         { id: "full_toilet", emoji: "🚽", text: "Tôi muốn đi vệ sinh.", isAction: true },
//         { id: "full_sleepy", emoji: "😴", text: "Tôi buồn ngủ. Tôi muốn đi ngủ.", isAction: true },
//         { id: "full_happy", emoji: "😃", text: "Tôi cảm thấy rất vui!", isAction: true },
//         { id: "full_sad", emoji: "😢", text: "Tôi đang buồn.", isAction: true },
//         { id: "full_thankyou", emoji: "🙏", text: "Cảm ơn bạn nhiều!", isAction: true },
//         { id: "full_yes", emoji: "👍", text: "Vâng, đúng vậy.", isAction: true },
//         { id: "full_no", emoji: "👎", text: "Không, tôi không nghĩ vậy.", isAction: true },
//         { id: "full_helpme", emoji: "🆘", text: "Làm ơn giúp tôi với!", isAction: true },
//         { id: "full_whatyourname", emoji: "❓", text: "Bạn tên là gì?", isAction: true },
//         { id: "full_howareyou", emoji: "🤔", text: "Bạn có khỏe không?", isAction: true },
//         { id: "full_goodbye", emoji: "👋", text: "Tạm biệt nhé!", isAction: true },
//         { id: "full_iloveyou", emoji: "❤️", text: "Tôi yêu bạn.", isAction: true },
//         { id: "full_sorry", emoji: "😔", text: "Tôi xin lỗi.", isAction: true },
//     ]
//   },
//   {
//     name: "Chủ ngữ / Đại từ",
//     mode: "construct",
//     items: [
//       { id: "i", emoji: "👤", text: "Tôi" }, { id: "you", emoji: "👉", text: "Bạn" },
//       { id: "he", emoji: "👨", text: "Anh ấy" }, { id: "she", emoji: "👩", text: "Cô ấy" },
//       { id: "we", emoji: "👥", text: "Chúng tôi" }, { id: "they", emoji: "👨‍👩‍👧‍👦", text: "Họ" },
//     ],
//   },
//   {
//     name: "Động từ mong muốn / Trạng thái",
//     mode: "construct",
//     items: [
//       { id: "want", emoji: "🙋", text: "muốn" }, { id: "need", emoji: "❗", text: "cần" },
//       { id: "like", emoji: "👍", text: "thích" }, { id: "feel", emoji: "💭", text: "cảm thấy" },
//       { id: "am", emoji: "➡️", text: "là" }, { id: "can", emoji: "💪", text: "có thể" },
//     ],
//   },
//   {
//     name: "Hành động / Nhu cầu",
//     mode: "both",
//     items: [
//       { id: "eat", emoji: "🍽️", text: "ăn", isAction: true }, { id: "drink", emoji: "🥤", text: "uống", isAction: true },
//       { id: "go_to", emoji: "➡️🚽", text: "đi đến" }, { id: "toilet_noun", emoji: "🚽", text: "nhà vệ sinh" },
//       { id: "sleep", emoji: "🛏️", text: "ngủ", isAction: true }, { id: "play", emoji: "🎮", text: "chơi", isAction: true },
//       { id: "watch", emoji: "👀", text: "xem" }, { id: "read", emoji: "📖", text: "đọc" },
//       { id: "help_verb", emoji: "🤝", text: "giúp đỡ" },
//     ],
//   },
//   {
//     name: "Cảm xúc (Từ đơn)",
//     mode: "construct",
//     items: [
//       { id: "adj_happy", emoji: "😊", text: "vui" }, { id: "adj_sad", emoji: "😟", text: "buồn" },
//       { id: "adj_angry", emoji: "😠", text: "tức giận" }, { id: "adj_tired", emoji: "😩", text: "mệt" },
//       { id: "adj_hungry_single", emoji: "🍽️❓", text: "đói" }, { id: "adj_thirsty_single", emoji: "💧❓", text: "khát" },
//     ],
//   },
//   {
//     name: "Sức khỏe (Từ đơn)",
//     mode: "construct",
//     items: [
//       { id: "adj_sick", emoji: "🤒", text: "ốm" }, { id: "doctor_noun", emoji: "👨‍⚕️", text: "bác sĩ" },
//       { id: "medicine", emoji: "💊", text: "thuốc" },
//     ],
//   },
//   {
//     name: "Danh từ / Đối tượng / Địa điểm",
//     mode: "construct",
//     items: [
//       { id: "water", emoji: "💧", text: "nước" }, { id: "food", emoji: "🍎", text: "đồ ăn" },
//       { id: "home", emoji: "🏠", text: "nhà" }, { id: "book", emoji: "📚", text: "sách" },
//       { id: "tv_noun", emoji: "📺", text: "TV" }, { id: "game_noun", emoji: "🎲", text: "trò chơi" },
//       { id: "school", emoji: "🏫", text: "trường học" }, { id: "park", emoji: "🌳", text: "công viên" },
//     ],
//   },
//   {
//     name: "Từ nối / Giới từ / Thời gian",
//     mode: "construct",
//     items: [
//         {id: "and", emoji: "➕", text: "và"}, {id: "or", emoji: "➗", text: "hoặc"},
//         {id: "with", emoji: "🧑‍🤝‍🧑", text: "với"}, {id: "now", emoji: "⏰", text: "bây giờ"},
//         {id: "later", emoji: "⏳", text: "lát nữa"}, {id: "please", emoji: "🙏", text: "làm ơn"},
//     ]
//   }
// ];
// // --- Kết thúc định nghĩa Interface và Dữ liệu ---

// type DisplayMode = "fullSentence" | "sentenceConstructor";

// export default function NeedBoard() {
//   const [currentMessage, setCurrentMessage] = useState<string>("");
//   const [constructedSentence, setConstructedSentence] = useState<WordPiece[]>([]);
//   const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
//   const [displayMode, setDisplayMode] = useState<DisplayMode>("fullSentence");
//   const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false); // State mới

//   const HOME_BUTTON_HEIGHT = 70; 
//   const MODE_BUTTON_HEIGHT = 50; 
//   const VOICE_SELECT_HEIGHT = 60; // Chiều cao của nút GazeButton chọn giọng nói (khi đóng)


//   useEffect(() => {
//     if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
//       const synth = window.speechSynthesis;
//       setSpeechSynthesis(synth);
//       const loadVoices = () => {
//         const availableVoices = synth.getVoices();
//         setVoices(availableVoices);
//         const vietnameseVoice = availableVoices.find(voice => voice.lang.startsWith('vi'));
//         if (vietnameseVoice) setSelectedVoice(vietnameseVoice);
//         else if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
//       };
//       loadVoices();
//       if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
//     } else {
//       console.warn("Web Speech API (SpeechSynthesis) is not supported.");
//     }
//   }, []);

//   const speakText = (textToSpeak: string) => {
//     if (speechSynthesis && textToSpeak) {
//       speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(textToSpeak);
//       if (selectedVoice) utterance.voice = selectedVoice;
//       speechSynthesis.speak(utterance);
//     }
//   };

//   const handleWordPieceClick = (item: WordPiece) => {
//     if (displayMode === "fullSentence" || item.isAction) {
//       if (displayMode === "sentenceConstructor" && constructedSentence.length > 0 && item.isAction) {
//         const finalSentenceArray = [...constructedSentence, item];
//         const sentenceText = finalSentenceArray.map(p => p.text).join(" ");
//         setCurrentMessage(sentenceText);
//         speakText(sentenceText);
//         setConstructedSentence([]);
//       } else {
//         setCurrentMessage(item.text);
//         speakText(item.text);
//         setConstructedSentence([]);
//       }
//     } else if (displayMode === "sentenceConstructor" && !item.isAction) {
//       const newSentenceArray = [...constructedSentence, item];
//       setConstructedSentence(newSentenceArray);
//       const sentenceText = newSentenceArray.map(p => p.text).join(" ");
//       setCurrentMessage(sentenceText);
//     }
//   };

//   const handleSpeakConstructedSentence = () => {
//     const sentenceText = constructedSentence.map(p => p.text).join(" ");
//     if (sentenceText) {
//       setCurrentMessage(sentenceText);
//       speakText(sentenceText);
//     }
//   };

//   const handleClearSentence = () => {
//     setConstructedSentence([]);
//     setCurrentMessage("");
//     if (speechSynthesis) speechSynthesis.cancel();
//   };

//   const handleBackspace = () => {
//     if (constructedSentence.length > 0) {
//       const newSentenceArray = constructedSentence.slice(0, -1);
//       setConstructedSentence(newSentenceArray);
//       const sentenceText = newSentenceArray.map(p => p.text).join(" ");
//       setCurrentMessage(sentenceText);
//     }
//   };

//   const currentCategories = allCategories.filter(category => {
//     if (displayMode === "fullSentence") {
//       return category.mode === "full" || category.mode === "both";
//     }
//     if (displayMode === "sentenceConstructor") {
//       return category.mode === "construct" || category.mode === "both";
//     }
//     return true;
//   });

//   // Tính toán vị trí top cho các phần tử sticky
//   const modeButtonTop = `${HOME_BUTTON_HEIGHT}px`;
//   const voiceSelectTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT}px`;
//   const categoryTitleTop = `${HOME_BUTTON_HEIGHT + MODE_BUTTON_HEIGHT + VOICE_SELECT_HEIGHT}px`;


//   return (
//     <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-150px)] max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
//       <aside className="w-full md:w-72 lg:w-80 p-4 bg-slate-100 rounded-lg md:mr-6 mb-6 md:mb-0 flex flex-col gap-4">
//         <GazeButton
//             onClick={() => (window.location.href = "/")}
//             className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-2xl md:text-4xl sticky top-0 z-30"
//             style={{ height: `${HOME_BUTTON_HEIGHT}px` }} // Set chiều cao cố định để tính toán sticky
//         >
//             🏠
//             <span className="ml-2 text-sm md:text-base hidden md:inline">Trang Chủ</span>
//         </GazeButton>

//         <div className="sticky z-30 bg-slate-100 py-2 flex gap-2" style={{ top: modeButtonTop, height: `${MODE_BUTTON_HEIGHT}px` }}>
//             <GazeButton
//                 onClick={() => { setDisplayMode("fullSentence"); setConstructedSentence([]); setCurrentMessage(""); setIsVoiceSelectorOpen(false); }}
//                 className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors
//                             ${displayMode === 'fullSentence' ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//             >
//                 Câu Đầy Đủ
//             </GazeButton>
//             <GazeButton
//                 onClick={() => { setDisplayMode("sentenceConstructor"); setConstructedSentence([]); setCurrentMessage(""); setIsVoiceSelectorOpen(false); }}
//                 className={`flex-1 p-2.5 rounded-md text-sm font-medium transition-colors
//                             ${displayMode === 'sentenceConstructor' ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//             >
//                 Ghép Câu
//             </GazeButton>
//         </div>

//         {voices.length > 0 && speechSynthesis && (
//           <div className="relative my-1 sticky z-20 bg-slate-100 py-2" style={{ top: voiceSelectTop }}> {/* Chứa GazeButton chính và danh sách thả xuống */}
//             <GazeButton
//               onClick={() => setIsVoiceSelectorOpen(!isVoiceSelectorOpen)}
//               className="w-full p-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex justify-between items-center"
//               style={{ height: `${VOICE_SELECT_HEIGHT}px` }} // Chiều cao cố định cho nút chính
//               aria-expanded={isVoiceSelectorOpen}
//               aria-haspopup="listbox"
//               aria-controls="voice-options-list"
//             >
//               <span className="truncate">
//                 Giọng: {selectedVoice ? (selectedVoice.name.length > 20 ? selectedVoice.name.substring(0,17) + '...' : selectedVoice.name) + ` (${selectedVoice.lang})` : 'Mặc định'}
//               </span>
//               <span className="text-xs ml-2">{isVoiceSelectorOpen ? '▲' : '▼'}</span>
//             </GazeButton>

//             {isVoiceSelectorOpen && (
//               <div
//                 id="voice-options-list"
//                 role="listbox"
//                 className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto z-40" // z-40 để nổi trên h3
//                 // style={{ top: '100%' }} // Can thiệp vào vị trí nếu GazeButton cha có padding từ div ngoài
//               >
//                 {voices.map(voice => (
//                   <GazeButton
//                     key={voice.name}
//                     onClick={() => {
//                       setSelectedVoice(voice);
//                       setIsVoiceSelectorOpen(false); // Đóng danh sách sau khi chọn
//                     }}
//                     className={`w-full p-2.5 text-left text-xs hover:bg-sky-100 ${selectedVoice && selectedVoice.name === voice.name ? 'bg-sky-200 font-semibold' : 'bg-white'}`}
//                     role="option"
//                     aria-selected={selectedVoice?.name === voice.name}
//                   >
//                     {voice.name.length > 35 ? voice.name.substring(0,32) + '...' : voice.name} ({voice.lang})
//                   </GazeButton>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {currentCategories.map(category => (
//           <div key={category.name} className="mb-3">
//             <h3 className="text-md font-semibold text-gray-700 mb-2 sticky z-10 bg-slate-100 py-1" style={{ top: categoryTitleTop }}>
//               {category.name}
//             </h3>
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//               {category.items.map((item) => (
//                 <GazeButton
//                   key={item.id}
//                   onClick={() => {handleWordPieceClick(item); setIsVoiceSelectorOpen(false);}} // Đóng voice selector khi chọn từ
//                   className="flex flex-col items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 aspect-square"
//                   title={item.text}
//                 >
//                   {item.emoji && <span className="text-3xl md:text-4xl mb-1">{item.emoji}</span>}
//                   <span className={`text-xs text-center ${!item.emoji && item.text.length < 10 ? 'py-3 text-sm' : 'text-xs'}`}>{item.text}</span>
//                 </GazeButton>
//               ))}
//             </div>
//           </div>
//         ))}
//       </aside>

//       <main className="flex-grow flex flex-col p-6 bg-gray-50 rounded-lg">
//         <div
//           id="message-display"
//           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-700 break-words mb-6 p-6 border-2 border-gray-400 rounded-lg bg-white min-h-[180px] flex items-center justify-center shadow-md"
//           // className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-700 break-words mb-6 p-4 border border-gray-300 rounded-lg bg-white min-h-[100px] flex items-center justify-center"
//           style={{ lineHeight: '1.5' }}
//         >
//           {currentMessage || (displayMode === "sentenceConstructor" ? "Hãy chọn các biểu tượng để tạo câu..." : "Chọn một câu có sẵn...")}
//         </div>

//         {displayMode === "sentenceConstructor" && (
//             <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
//                 <GazeButton
//                     onClick={() => {handleSpeakConstructedSentence(); setIsVoiceSelectorOpen(false);}} // Đóng voice selector
//                     disabled={constructedSentence.length === 0}
//                     className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//                 >
//                     <span className="text-2xl">🔊</span> Nói
//                 </GazeButton>
//                 <GazeButton
//                     onClick={() => {handleBackspace(); setIsVoiceSelectorOpen(false);}} // Đóng voice selector
//                     disabled={constructedSentence.length === 0}
//                     className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//                 >
//                     <span className="text-2xl">⬅️</span> Xóa lùi
//                 </GazeButton>
//                 <GazeButton
//                     onClick={() => {handleClearSentence(); setIsVoiceSelectorOpen(false);}} // Đóng voice selector
//                     disabled={constructedSentence.length === 0 && !currentMessage}
//                     className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 text-lg flex items-center gap-2"
//                 >
//                     <span className="text-2xl">❌</span> Xóa hết
//                 </GazeButton>
//             </div>
//         )}

//         {displayMode === "sentenceConstructor" && constructedSentence.length > 0 && (
//           <div className="mt-4 p-3 border-t border-gray-300">
//             <h4 className="text-sm font-semibold text-gray-600 mb-2">Câu đang ghép:</h4>
//             <div className="flex flex-wrap gap-2">
//               {constructedSentence.map((piece, index) => (
//                 <span key={`${piece.id}-${index}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm flex items-center">
//                   {piece.emoji && <span className="mr-1">{piece.emoji}</span>}
//                   {piece.text}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }









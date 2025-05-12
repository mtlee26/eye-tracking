import { useState } from "react";

export default function VoiceToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "vi-VN"; // Cấu hình ngôn ngữ (ví dụ: tiếng Việt)
      recognition.continuous = false; // Lắng nghe từng câu một
      recognition.interimResults = false; // Chỉ trả về kết quả hoàn chỉnh

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Văn bản đã nhận diện
        setText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start(); // Bắt đầu lắng nghe
    } else {
      alert("Trình duyệt của bạn không hỗ trợ Web Speech API!");
    }
  };

  return (
    <div color="white">
      <h1>Voice to Text</h1>
      <button
        onClick={startListening}
        style={{ cursor: "pointer", background: "blue", color: "white" }}
      >
        {isListening ? "Đang nghe..." : "Bắt đầu nói"}
      </button>
      <p>Kết quả: {text}</p>
    </div>
  );
}

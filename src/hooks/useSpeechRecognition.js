import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState(null);
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = "vi-VN";
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };
  }, [recognition]);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    recognition?.stop();
    setIsListening(false);
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;

import React from "react";
import { useGazeData } from "@/hooks/GazeContext";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

function DisplayGaze() {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div style={{ color: "white" }}>
      {hasRecognitionSupport ? (
        <>
          <button onClick={startListening}>Start Listening</button>

          {isListening ? (
            <div>
              <p>Listening...</p>
            </div>
          ) : null}
        </>
      ) : (
        <>WHY NOTHING</>
      )}
    </div>
  );
}

export default DisplayGaze;

import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo Context
const GazeDataContext = createContext();

export const useGazeData = () => useContext(GazeDataContext);

export const GazeDataProvider = ({ children }) => {
  const [gazeData, setGazeData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGazeData(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <GazeDataContext.Provider value={gazeData}>
      {children}
    </GazeDataContext.Provider>
  );
};

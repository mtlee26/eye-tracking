const WebSocket = require("ws");
const HTTP = require("http");
const server = HTTP.createServer();
const wss = new WebSocket.Server({ server });

function connectToGazePointer() {
  const appKey = "AppKeyTrial";
  const port = 43333;
  const url = `ws://127.0.0.1:${port}`;

  const gazeWs = new WebSocket(url);

  gazeWs.on("open", () => {
    gazeWs.send(appKey);
    console.log("Connected to GazePointer!");
  });

  gazeWs.on("message", (data) => {
    let received_msg = data.toString();
    console.log("Received:", received_msg);

    if (received_msg.substring(0, 2) === "ok") {
      console.log("Connection authorized!");
    } else {
      try {
        const GazeData = JSON.parse(received_msg);
        plotGazeData(GazeData);
        const gazeDataString = JSON.stringify(GazeData);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(gazeDataString);
          }
        });
      } catch (e) {
        console.error("Error parsing GazeData:", e);
      }
    }
  });

  gazeWs.on("error", (error) => {
    console.error("Error connecting to GazePointer:", error);
  });

  gazeWs.on("close", () => {
    console.log("Connection to GazePointer closed, attempting to reconnect...");
    setTimeout(connectToGazePointer, 5000);
  });
}

function plotGazeData(GazeData) {
  console.log(`GazeX: ${GazeData.GazeX}, GazeY: ${GazeData.GazeY}`);
  console.log(
    `HeadX: ${GazeData.HeadX}, HeadY: ${GazeData.HeadY}, HeadZ: ${GazeData.HeadZ}`
  );
  console.log(
    `Yaw: ${GazeData.HeadYaw}, Pitch: ${GazeData.HeadPitch}, Roll: ${GazeData.HeadRoll}`
  );
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log("Received:", message);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  connectToGazePointer();
});

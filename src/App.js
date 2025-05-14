import { useState, useEffect } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(false);

  // Check if token server is running and get LiveKit URL
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("http://localhost:4000/health");
        const data = await response.json();
        setIsServerRunning(data.status === "ok");

        // Pre-set the LiveKit URL to avoid "no livekit url provided" error
        setUrl("wss://luna-dev-i5xz2e66.livekit.cloud");
      } catch (error) {
        console.error("Token server not available:", error);
        setIsServerRunning(false);
      }
    };

    checkServer();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!roomName || !userName) {
      alert("Room name and user name are required!");
      return;
    }

    try {
      // Get token from our local token server
      const response = await fetch("http://localhost:4000/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: roomName,
          username: userName,
        }),
      });

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        // URL is already set in the useEffect
        setIsConnected(true);
      } else {
        alert(data.error || "Failed to get token");
      }
    } catch (error) {
      console.error("Error connecting to LiveKit:", error);
      alert("Error connecting to LiveKit: " + error.message);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setToken("");
  };

  return (
    <div className="App">
      {!isConnected ? (
        <div className="join-form">
          <h1>BuddyTalk</h1>
          <h2>LiveKit Video Chat</h2>
          {!isServerRunning && (
            <div className="server-warning">
              ⚠️ Token server not detected. Please start the server with:
              <pre>cd server && npm install && npm start</pre>
            </div>
          )}
          <form onSubmit={handleConnect}>
            <div className="form-group">
              <label htmlFor="roomName">Room Name:</label>
              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Your Name:</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <button type="submit">Join Room</button>
          </form>
        </div>
      ) : (
        <LiveKitRoom
          serverUrl={url}
          token={token}
          onDisconnected={handleDisconnect}
          data-lk-theme="default"
          style={{ height: "100vh" }}
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;

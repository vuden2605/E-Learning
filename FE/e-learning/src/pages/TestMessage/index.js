import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const Message = ({ lessonId }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const chatEndRef = useRef(null);

  const currentUserId = localStorage.getItem("userId"); // 👈 lấy từ localStorage (set khi login)

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/elearning/api/ws"),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        stompClient.subscribe(`/topic/lesson/${lessonId}`, (msg) => {
          const body = JSON.parse(msg.body);
          console.log(body);
          setMessages((prev) => [...prev, body]);
        });
      },
      debug: (str) => console.log(str),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [lessonId]);

  useEffect(() => {
    // mỗi lần có message mới thì cuộn xuống cuối
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (client && content.trim() !== "") {
      client.publish({
        destination: `/app/lesson/${lessonId}/send`,
        body: JSON.stringify({ content }),
      });
      setContent("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lesson {lessonId} Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.map((m, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      justifyContent:
        String(m.userResponse?.id) === String(currentUserId)
          ? "flex-end"
          : "flex-start",
      marginBottom: 8,
    }}
  >
    <div
      style={{
        maxWidth: "70%",
        padding: "8px 12px",
        borderRadius: 12,
        background:
          String(m.userResponse?.id) === String(currentUserId)
            ? "#DCF8C6" // màu xanh nhạt cho mình
            : "#fff", // màu trắng cho người khác
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      <b>
        {String(m.userResponse?.id) === String(currentUserId)
          ? "You"
          : m.userResponse?.fullName}
        :
      </b>{" "}
      {m.content}
    </div>
  </div>
))}

        <div ref={chatEndRef} />
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "70%", marginRight: 10, padding: 5 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Message;

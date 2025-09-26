import { useState, useEffect, useRef } from "react";
import { Input, Button, Drawer } from "antd";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import MaterialService from "../../services/MaterialService";
import CommentItem from "../CommentItems";

const API_URL = process.env.REACT_APP_API_URL;

const Chat = ({ materialId, open, onClose }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [parentId, setParentId] = useState(null); 
  const [parentReply, setParentReply] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null); 
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!materialId) return;

    let subscription;
    const fetchMessages = async () => {
      try {
        const msgs = await MaterialService.getMessagesByMaterialId(materialId);
        setMessages(msgs);
      } catch (err) {
        console.error("Lỗi khi load messages:", err);
      }
    };
    const addMessageToTree = (messages, newMessage) => {
      if (!newMessage.parentId) {
        return [...messages, { ...newMessage, replies: [] }];
      }
      return messages.map((msg) => {
        if (msg.id === newMessage.parentId) {
          return {
            ...msg,
            replies: [...(msg.replies || []), { ...newMessage, replies: [] }],
          };
        }
        return msg;
      });
    };

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      onConnect: () => {
        fetchMessages();
        subscription = stompClient.subscribe(
          `/topic/material/${materialId}`,
          (msg) => {
            const body = JSON.parse(msg.body);
            setMessages((prev) => addMessageToTree(prev, body));
          }
        );
      },
      debug: (str) => console.log(str),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      stompClient.deactivate();
    };
  }, [materialId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (client && input.trim() !== "") {
      client.publish({
        destination: `/app/material/${materialId}/send`,
        body: JSON.stringify({ content: input, parentId }),
      });
      setInput("");
      setParentId(null);
      setParentReply(null);
      setReplyingTo(null);
    }
  };

  const handleSubmit = () => {
    sendMessage();
  };

  const handleReply = (msg, author) => {
    setParentId(msg.parentId ? msg.parentId : msg.id);   
    setReplyingTo(author);
    setParentReply(msg.id);
  };

  return (
    <Drawer
      title="Hỏi đáp khóa học"
      placement="right"
      onClose={() => {
        setParentId(null);
        setParentReply(null);
        setReplyingTo(null);
        setInput("");
        onClose();
      }}
      open={open}
      width={450}
    >
      {!parentReply  && (
        <>
          <Input.TextArea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập bình luận mới của bạn"
          />
          <Button type="primary" onClick={handleSubmit} style={{ marginTop: 8 }}>
            Gửi
          </Button>
        </>
      )}

      <div style={{ marginTop: 16 }}>
        {messages.map((item) => (
          <CommentItem
            key={item.id}
            item={item}
            onReply={handleReply}
            parentReply={parentReply}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
        ))}
      </div>

      <div ref={chatEndRef} />
    </Drawer>
  );
};

export default Chat;

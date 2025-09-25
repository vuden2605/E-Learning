// Chat.jsx
import { useState } from "react";
import { List, Avatar, Input, Button, Typography, Drawer } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const CommentItem = ({ author, avatar, content, datetime, onReply }) => (
  <div style={{ display: "flex", marginBottom: 16 }}>
    <Avatar src={avatar} alt={author} />
    <div style={{ marginLeft: 10, flex: 1 }}>
      <Text strong>{author}</Text>
      <div style={{ margin: "4px 0" }}>{content}</div>
      <div style={{ fontSize: 12, color: "#999" }}>
        {datetime} ·{" "}
        <Button type="link" size="small" onClick={onReply}>
          Phản hồi
        </Button>
      </div>
    </div>
  </div>
);

const ChatUI = ({ open, onClose }) => {
  const [comments, setComments] = useState([
    { author: "Phong Lê Văn", avatar: "https://joeschmoe.io/api/v1/random", content: "HỌC MIỄN PHÍ KHÔNG BIẾT CÓ ĐỦ KIẾN THỨC KHÔNG Ạ", datetime: "1 tháng trước" },
    { author: "Đại Vũ Trần", avatar: "https://joeschmoe.io/api/v1/random", content: "👍", datetime: "2 tháng trước" },
  ]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    setComments([
      { author: "Bạn", avatar: "https://joeschmoe.io/api/v1/random", content: value, datetime: "Vừa xong" },
      ...comments,
    ]);
    setValue("");
  };

  const handleReply = (author) => setValue(`@${author} `);

  return (
    <Drawer
      title="Hỏi đáp khóa học"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <h3>{comments.length} bình luận</h3>
      <TextArea
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập bình luận mới của bạn"
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 8 }}>
        Gửi
      </Button>
      <List
        style={{ marginTop: 16 }}
        dataSource={comments}
        renderItem={(item) => (
          <CommentItem {...item} onReply={() => handleReply(item.author)} />
        )}
      />
    </Drawer>
  );
};

export default ChatUI;

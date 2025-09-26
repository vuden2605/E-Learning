import formatDateTime from "../../utils/formatDatetime";
import { Avatar, Button, Typography, Input } from "antd";
const { Text } = Typography;
const { TextArea } = Input;

const CommentItem = ({ item, onReply, level = 0, parentId, parentReply, input, setInput, handleSubmit }) => {
  return (
    <div style={{ marginLeft: level * 20, marginBottom: 16 }}>
      <div style={{ display: "flex" }}>
        <Avatar src={item.userResponse.avatarUrl} alt={item.userResponse.fullName} />
        <div style={{ marginLeft: 10, flex: 1 }}>
          <Text strong>{item.userResponse.fullName}</Text>
          <div style={{ margin: "4px 0" }}>{item.content}</div>
          <div style={{ fontSize: 12, color: "#999" }}>
            {formatDateTime(item.sentAt)} ·{" "}
            <Button
              type="link"
              size="small"
              onClick={() => onReply(item, item.userResponse.fullName)}
            >
              Phản hồi
            </Button>
          </div>

          {/* Hiển thị input ngay dưới comment được chọn */}
          {parentReply === item.id && (
            <div style={{ marginTop: 8 }}>
              <TextArea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Phản hồi @${item.userResponse.fullName}`}
              />
              <div style={{ marginTop: 4 }}>
                <Button type="primary" size="small" onClick={handleSubmit}>
                  Gửi
                </Button>
                <Button
                  size="small"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    setInput("");
                    onReply(null, null); 
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render replies */}
      {item.replies && item.replies.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {item.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              item={reply}
              onReply={onReply}
              parentReply={parentReply}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;

import { Card, Avatar, Typography, Space } from "antd";
import "./style.scss"; // import SCSS
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

export default function BlogCard({
  id,
  image,
  title,
  content,
  author,
  authorAvatar
}) {
  return (
    <Link 
      to={`/blog/${id}`} 
      style={{ textDecoration: "none" }}>
      <Card
        hoverable
        className="blog-card"
        cover={
          <img alt={title} src={image} className="cover" />
        }
      >
        <Title level={5} className="title">
          {title}
        </Title>

        {author && (
          <Space align="center" className="author">
            <Avatar src={authorAvatar} />
            <Text strong>{author}</Text>
          </Space>
        )}

        {content && <Text type="secondary">{content}</Text>}

        <div className="footer-blog-card">
        <span style={{ color: "lightblue", fontWeight: "bold" }}>
          Xem thêm...
        </span>
        </div>
      </Card>
    </Link>
  );
}

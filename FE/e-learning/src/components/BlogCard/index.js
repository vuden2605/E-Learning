import { Card, Avatar, Typography, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./style.scss"; // import SCSS

const { Title, Text, Link } = Typography;

export default function BlogCard({
  image,
  title,
  description,
  author,
  authorAvatar,
  views,
  readMoreLink,
}) {
  return (
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

      {description && <Text type="secondary">{description}</Text>}

      <div className="footer">
        {readMoreLink && <Link href={readMoreLink}>Read more</Link>}
        {views && (
          <Space>
            <EyeOutlined />
            <Text type="secondary">{views}</Text>
          </Space>
        )}
      </div>
    </Card>
  );
}

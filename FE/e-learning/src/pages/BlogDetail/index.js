import React from "react";
import { Card, Typography, Tag, Avatar, Button, Divider, Image, Row, Col, Pagination } from "antd";
import BlogCard from "../../components/BlogCard";
import "./style.scss";

const { Title, Paragraph, Text, Link } = Typography;

export default function BlogDetail() {
  const relatedBlogs = [
    {
      id: 1,
      title: "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
      description: "Class, launched less than a year ago by Blackboard co-founder Michael Chasen...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "251,232",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      readMoreLink: "/blog/1",
    },
    {
      id: 2,
      title: "Another blog title example for responsive layout and testing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      readMoreLink: "/blog/2",
    },
    {
      id: 3,
      title: "Another blog title example for responsive layout and testing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      readMoreLink: "/blog/3",
    },
    {
      id: 4,
      title: "Another blog title example for responsive layout and testing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      readMoreLink: "/blog/4",
    }
  ];

  return (
    <div className="blog-detail">
      {/* Blog Detail */}
      <Card
        className="blog-detail-card"
        cover={
          <Image
            alt="blog cover"
            src="https://picsum.photos/900/400"
            preview={false}
            height={400}
            style={{ objectFit: "cover" }}
            className="blog-cover"
          />
        }
      >
        {/* Tiêu đề */}
        <Title level={3} className="blog-title">
          Why Swift UI Should Be on the Radar of Every Mobile Developer
        </Title>

        {/* Nội dung */}
        <Typography className="blog-content">
          <Paragraph>
            TOTC is a platform that allows educators to create online classes...
          </Paragraph>
          <Paragraph>
            TOTC is a platform that allows educators to create online classes...
          </Paragraph>
          <Paragraph>
            TOTC is a platform that allows educators to create online classes...
          </Paragraph>
          <Paragraph>
            TOTC is a platform that allows educators to create online classes...
          </Paragraph>
        </Typography>

        {/* Tags */}
        <div className="tags">
          <Tag color="blue">affordable</Tag>
          <Tag color="green">stunning</Tag>
          <Tag color="cyan">making</Tag>
          <Tag color="geekblue">modadowns</Tag>
        </div>

        <Divider />

        {/* Tác giả + Follow */}
        <div className="author-box">
          <div className="author-info">
            <Avatar src="https://i.pravatar.cc/150?img=32" size={48} />
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Written by
              </Text>
              <br />
              <Text strong>Lina</Text>
            </div>
          </div>
          <Button type="default">Follow</Button>
        </div>
      </Card>

      {/* Related Blog */}
      <div className="related-blog">
        <Row justify="space-between" align="middle" className="related-header">
          <Title level={4}>Related Blog</Title>
          <Link href="#">See all</Link>
        </Row>

        <Row gutter={[24, 24]}>
          {relatedBlogs.map((blog) => (
            <Col xs={24} sm={12} md={8} key={blog.id}>
              <BlogCard {...blog} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="pagination">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

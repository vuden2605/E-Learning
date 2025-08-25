import { Row, Col, Typography, Button, Pagination } from "antd";
import BlogCard from "../../components/BlogCard";
import "./style.scss"; // import SCSS
import ReadingBlogList from "../../components/BlogCategory"; 
import { useRef } from "react";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
const { Title, Text, Link } = Typography;

export default function BlogPage() {
  const readingCategories = ["UX/UI", "React", "PHP", "JavaScript"];
  const relatedBlogs = [
    {
      id: 1,
      title:
        "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
      description:
        "Class, launched less than a year ago by Blackboard co-founder Michael Chasen...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "251,232",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    {
      id: 2,
      title:
        "Another blog title example for responsive layout and testing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    {
      id: 3,
      title:
        "Another blog title example for responsive layout and testing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    {
      id: 4,
      title:
        "Another blog title example for responsive layout and testing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Lina",
      authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      views: "123,456",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  ];
  const relatedRef = useRef(null);

  const handleCategoryClick = () => {
    relatedRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="blog-page">
      {/* Featured Blog */}
      <Row gutter={40} align="middle" className="featured-blog">
        <Col xs={24} md={12}>
          <Text>
            By <b>Themadrains</b> in <Text type="success">Inspiration</Text>
          </Text>
          <Title level={2}>Why Swift UI Should Be on the Radar of Every Mobile Developer</Title>
          <Text type="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
          </Text>
          <div className="btn-wrapper">
            <Button type="primary" shape="round" size="large">
              Start learning now
            </Button>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            alt="Featured blog"
            className="featured-image"
          />
        </Col>
      </Row>

      <ReadingBlogList categories={readingCategories} onCategoryClick={handleCategoryClick} />
      <div className="square-outlined">
          <LeftSquareOutlined
            style={{
              fontSize: "30px",
              color: "#fff",
              backgroundColor: "#6AB9BC",
              borderRadius: "5px",
            }}
          />
          <RightSquareOutlined
            style={{
              fontSize: "30px",
              color: "#fff",
              backgroundColor: "#6AB9BC",
              borderRadius: "5px",
            }}
          />
        </div>
      {/* Related Blog */}
      <div className="related-blog " ref={relatedRef}>
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
            <Pagination
              defaultCurrent={1}
              total={50}
            />
        </div>
    </div>
  );
}

import { Row, Col, Typography, Button, Pagination } from "antd";
import BlogCard from "../../components/BlogCard";
import "./style.scss"; // import SCSS
import BlogCategory from "../../components/BlogCategory"; 
import { useRef, useEffect, useState } from "react";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import { BlogService } from "../../services/BlogService.js";
import { CategoryService } from "../../services/CategoryService.js";
const { Title, Text} = Typography;

export default function BlogPage() {
  const [blogs, setBlogs] = useState({ content: [], totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const relatedRef = useRef(null);
  const pageSize = 6;
  const [categoryPage, setCategoryPage] = useState(0);
  const categoryPageSize = 4;
  useEffect(() => {
    const fetchBlogs = async (page, pageSize, selectedCategory) => {
      try {
        const blogs = await BlogService.getAllBlogs(page, pageSize,selectedCategory);
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };
    fetchBlogs(currentPage, pageSize, selectedCategory);
  }, [currentPage,selectedCategory]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id); 
    setCurrentPage(0);
    relatedRef.current?.scrollIntoView({ behavior: "smooth" });
  };  
  const handlePrevCategory = () => {
    console.log("clickl");
    if (categoryPage > 0) setCategoryPage(categoryPage - 1);
  };

  const handleNextCategory = () => {
    console.log("clickr");
    if ((categoryPage + 1) * categoryPageSize < categories.length) {
      setCategoryPage(categoryPage + 1);
    }
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

      <BlogCategory
        categories={categories} 
        onCategoryClick={handleCategoryClick}
        currentPage={categoryPage}
        pageSize={categoryPageSize}
      />
      <div className="square-outlined">
        <div className="arrow-btn" onClick={handlePrevCategory}>
          <LeftSquareOutlined />
        </div>
        <div className="arrow-btn" onClick={handleNextCategory}>
          <RightSquareOutlined />
        </div>
      </div>

      {/* Related Blog */}
      <div className="related-blog" ref={relatedRef}>
        <div className="related-header">
          <Title level={4}>Related Blog</Title>
        </div>

        <div className="blog-grid">
          {blogs.content.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.imageUrl}
              title={blog.title}
              content={blog.content}
              author={blog.instructor.user.fullName}
              authorAvatar={blog.instructor.user.avatarUrl}
            />
          ))}
        </div>
      </div>
      <div className="pagination">
          <Pagination
            current={currentPage + 1}
            total={blogs.totalElements}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
      </div>
    </div>
  );
}

import React from "react";
import { Card, Typography, Avatar, Divider, Image, Pagination } from "antd";
import BlogCard from "../../components/BlogCard";
import { useParams } from "react-router-dom";
import { BlogService }  from "../../services/BlogService";
import { useState, useEffect } from "react";
import "./style.scss";

const { Title, Paragraph, Text } = Typography;

export default function BlogDetail() {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState({ content: [], totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const blog = await BlogService.getBlogById(id);
        setBlogDetail(blog);
        setCurrentPage(0); 
      } catch (error) {
        console.error("Error fetching blog by ID:", error);
      }
    };
    fetchBlogDetail();
  }, [id]);
  useEffect(() => {
    if (!blogDetail?.category?.id) return; 
    const fetchRelatedBlogs = async () => {
      try {
        const related = await BlogService.getAllBlogs(
          currentPage, 
          pageSize, 
          blogDetail.category.id
        );
        setRelatedBlogs(related);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };
    fetchRelatedBlogs();
  }, [blogDetail, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1); 
  };

  if (!blogDetail) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      {/* Blog Detail */}
      <Card
        className="blog-detail-card"
        cover={
          <Image
            alt="blog cover"
            src={blogDetail?.imageUrl}
            preview={false}
            height={400}
            style={{ objectFit: "cover" }}
            className="blog-cover"
          />
        }
      >
        <Title level={3}>{blogDetail?.title}</Title>
        <Typography>
          <Paragraph>{blogDetail?.content}</Paragraph>
        </Typography>
        <Divider />
        <div className="author-box">
          <Avatar src={blogDetail?.instructor?.user?.avatarUrl} size={48} />
          <Text strong>{blogDetail?.instructor?.user?.email}</Text>
        </div>
      </Card>

      {/* Related Blog */}
      <div className="related-blog">
        <Title level={4}>Related Blog</Title>
        <div className="blog-grid">
          {relatedBlogs.content.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.imageUrl}
              title={blog.title}
              content={blog.content}
              author={blog.instructor.user.email}
              authorAvatar={blog.instructor.user.avatarUrl}
            />
          ))}
        </div>
      </div>

      <Pagination className="pagination"
        current={currentPage + 1}
        total={relatedBlogs.totalElements}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </div>
  );
}

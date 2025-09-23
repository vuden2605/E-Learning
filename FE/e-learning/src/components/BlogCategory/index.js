import { Row, Col, Typography } from "antd";
import "./style.scss";

const { Title } = Typography;

export default function BlogCategory({ categories, onCategoryClick, currentPage, pageSize }) {
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleCategories = categories?.slice(startIndex, endIndex) || [];

  return (
    <div className="reading-list">
      <Title level={4}>Reading blog list</Title>
      <Row gutter={[24, 24]}>
        {visibleCategories.map((cat, i) => (
          <Col xs={12} md={6} key={i}>
            <div
              className="category-card"
              onClick={() => onCategoryClick(cat)}
              style={{ cursor: "pointer" }}
            >
              <img
                alt={cat.name}
                src={cat.thumbnailUrl}
                className="category-image"
              />
              <Title level={5}>{cat.name}</Title>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

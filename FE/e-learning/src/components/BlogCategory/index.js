import { Row, Col, Typography } from "antd";
import "./style.scss";

const { Title } = Typography;

export default function BlogCategory({ categories, onCategoryClick }) {
  return (
    <div className="reading-list">
      <Title level={4}>Reading blog list</Title>
      <Row gutter={[24, 24]}>
        {categories.map((cat, i) => (
          <Col xs={12} md={6} key={i}>
            <div
              className="category-card"
              onClick={() => onCategoryClick()} 
              style={{ cursor: "pointer" }}
            >
              <img
                alt={cat}
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                className="category-image"
              />
              <Title level={5}>{cat}</Title>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

import "./style.scss";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function CourseCard({title, description, price, discount, thumbnailUrl}) {
  return (
    // NHỚ XÓA THẺ LINK TRONG NÀY, ROUTER CỦA PAGE COURSEDETAIL
    <div className="coursecard">
      <Link to="/coursedetail" style={{ textDecoration: "none" }}>
        <div className="img-course">
          <img src={thumbnailUrl}></img>
        </div>
        <div className="title">
          <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
            {title}{" "}
          </h1>
        </div>
        <div className="description">{description}</div>
        <div className="price-tag">
          <Button type="primary" className="btn-addcart">
            <ShoppingCartOutlined />
            Thêm vào giỏ
          </Button>
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="old-price">
              <del>
                <i>${price}</i>
              </del>
            </div>
            <div className="new-price">${price * discount}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default CourseCard;

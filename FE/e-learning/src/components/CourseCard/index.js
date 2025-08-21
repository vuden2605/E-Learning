import "./style.scss";
import imgcourse from "../../assets/images/imgcourse.png";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function CourseCard() {
  return (
    // NHỚ XÓA THẺ LINK TRONG NÀY, ROUTER CỦA PAGE COURSEDETAIL
    <div className="coursecard">
      <Link to="/coursedetail" style={{ textDecoration: "none" }}>
        <div className="img-course">
          <img src={imgcourse}></img>
        </div>
        <div className="title">
          <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
            AWS Certified solutions Architect
          </h1>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod
          tempor
        </div>
        <div className="price-tag">
          <Button type="primary" className="btn-addcart">
            <ShoppingCartOutlined />
            Thêm vào giỏ
          </Button>
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="old-price">
              <del>
                <i>$100</i>
              </del>
            </div>
            <div className="new-price">$80</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default CourseCard;

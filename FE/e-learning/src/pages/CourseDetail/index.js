import "./style.scss";
import imgcourse from "../../assets/images/imcourse2.png";
import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  
} from "@ant-design/icons";
import { Button } from "antd";

function CourseDetail() {
  return (
    <div className="course-detail">
      <div className="img-course">
        <img className="img-cover" src={imgcourse}></img>
        <img className="img-main" src={imgcourse}></img>
      </div>
      <div className="detail">
        <div className="detail-content">
          <div
            style={{
              height: "80px",
              backgroundColor: "#fff", // nền trắng
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "linear-gradient(45deg, #1772B5, #f06595)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "36px",
                fontWeight: "700",
              }}
            >
              THÔNG TIN KHÓA HỌC
            </span>
          </div>
          <div className="content">
            Class, launched less than a year agoClass, launched less than a year
            ago by Blackboard co-founder Michael Chasen, integrates
            exclusively...Class, launched less than a year ago by Blackboard
            co-founder Michael Chasen, integrates exclusively...Class, launched
            less than a year ago by Blackboard co-founder Michael Chasen,
            integrates exclusively...Class, launched less than a year ago by
            Blackboard co-founder Michael Chasen, integrates
            exclusively...Class, launched less than a year ago by Blackboard
            co-founder Michael Chasen, integrates exclusively...Class, launched
            less than a year ago by Blackboard co-founder Michael Chasen,
            integrates exclusively...Class, launched less than a year ago by
            Blackboard co-founder Michael Chasen, integrates
            exclusively...Class, launched less than a year ago by Blackboard
            co-founder Michael Chasen, integrates exclusively... by Blackboard
            co-founder Michael Chasen, integrates exclusively...Class, launched
            less than a year ago by Blackboard co-founder Michael Chasen,
            integrates exclusively...Class, launched less than a year ago by
            Blackboard co-founder Michael Chasen, integrates
            exclusively...Class, launched less than a year ago by Blackboard
            co-founder Michael Chasen, integrates exclusively...Class, launched
            less than a year ago by Blackboard co-founder Michael Chasen,
            integrates exclusively...Class, launched less than a year ago by
            Blackboard co-founder Michael Chasen, integrates exclusively...
          </div>
        </div>
        <div className="detail-price">
          <div className="price">
            <div className="new-price">$80</div>

            <div className="old-price">
              <del>$100</del>
            </div>
            <div className="discount">50% OFF</div>
          </div>
          <div className="btn">
            <Button type="primary" className="btn-addcart">
              Thêm
              <ShoppingCartOutlined />
            </Button>
            <Button type="primary" className="btn-buy">
              Mua ngay
            </Button>
          </div>
          <div
            style={{
              height: "1px",
              backgroundColor: "#000",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          ></div>
          <div
            style={{
              fontWeight: "600",
              color: "#000",
              fontSize: "20px",
              marginBottom: "15px",
            }}
          >
            Chia sẻ khóa học
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#000",
              fontSize: "35px",
            }}
          >
            <FacebookOutlined />
            <TwitterOutlined />
            <InstagramOutlined />
            <YoutubeOutlined />
            <PhoneOutlined />
          </div>
        </div>
      </div>
      <div className="raiting"></div>
    </div>
  );
}
export default CourseDetail;

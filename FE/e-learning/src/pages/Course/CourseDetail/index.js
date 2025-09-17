import "./style.scss";
import cmtavt from "../../../assets/images/cmt_avt.jpg";
import {
  FacebookOutlined,
  InstagramOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button, Rate, Collapse } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseService } from "../../../services/CourseService";
import { formatCurrencyVND } from "../../../utils/formatCurrency";
import CourseContent from "../../../components/CourseContent";

function CourseDetail() {
  const { id } = useParams();
  console.log("id-param:", id);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await CourseService.getDetailCourse(id);
      console.log("data:", res);
      setCourse(res);
    };
    fetchDetail();
  }, [id]);
  useEffect(() => {
    const getLessonByCourse = async () => {
      const res = CourseService.getLessonByCourse(id);
      console.log(res);
    };
    getLessonByCourse();
  })
  return (
    <div className="course-detail">
      <div className="img-course">
        <img className="img-cover" src={course.thumbnailUrl}></img>
        <img className="img-main" src={course.thumbnailUrl}></img>
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
          <div className="content-text">
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                fontSize: "25px",
              }}
            >
              Nội dung bài học
            </div>
            <div> {course.description}</div>
          </div>
          <div className="content-item">
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                fontSize: "25px",
              }}
            >
              Nội dung khóa học
            </div>
          </div>
        </div>
        <div className="detail-price">
          <div className="name-course">{course.title}</div>
          <div className="price">
            <div className="new-price">
              {formatCurrencyVND(
                (course.price * (100 - course.discountPercent)) / 100
              )}
            </div>

            <div className="old-price">
              <del>{formatCurrencyVND(course.price)}</del>
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
      <div className="rating">
        <CourseContent courseId = {id}/>

        <span
          style={{
            fontWeight: "600",
            fontSize: "30px",
            color: "#000",
          }}
        >
          Xếp hạng và đánh giá
        </span>
        <div className="rating-summary">
          <div>
            <div className="rating-score">4.6</div>
            <div className="rating-stars">
              <Rate
                disabled
                defaultValue={4.6}
                style={{ fontSize: "14px", color: "#3B8562" }}
              />
            </div>
            <div className="rating-count">138 N bài đánh giá</div>
          </div>
          <div className="rating-distribute">
            <li>
              {/* render truyền tỉ lệ vô style */}
              <span>5</span>
              <div className="rating_bar">
                <div className="rating_bar_child"></div>
              </div>
            </li>
            <li>
              <span>4</span>
              <div className="rating_bar">
                <div className="rating_bar_child"></div>
              </div>
            </li>
            <li>
              <span>3</span>
              <div className="rating_bar">
                <div className="rating_bar_child"></div>
              </div>
            </li>
            <li>
              <span>2</span>
              <div className="rating_bar">
                <div className="rating_bar_child"></div>
              </div>
            </li>
            <li>
              <span>1</span>
              <div className="rating_bar">
                <div className="rating_bar_child"></div>
              </div>
            </li>
          </div>
        </div>
        <div className="review-card">
          <div className="review-header">
            <img src={cmtavt}></img>
            <span className="name">J97</span>
          </div>
          <div className="review-rating">
            <div className="rate-start">
              <Rate
                disabled
                defaultValue={4.6}
                className="custom-rate"
                style={{ fontSize: "9px", color: "#3B8562" }}
              />
            </div>
            <div className="date">13 tháng 8, 2025</div>
          </div>
          <div className="review-content">
            Nhồng nhần nhên nhôi nhánh nhay nhọa nhời nhem nhong nhút nhây nhừ
            nhày nhơ nhấy nhòn nhủ nhơ nhến nhi nhem nhờ nhơ nhòng nhười nhanh
            nhâu nhó nhay nhột nhày nhi nhỗ nhánh nhay
          </div>
        </div>
      </div>
    </div>
  );
}
export default CourseDetail;

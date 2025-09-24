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
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseService } from "../../../services/CourseService";
import { formatCurrencyVND } from "../../../utils/formatCurrency";
import CourseContent from "../../../components/CourseContent";
import { CartService } from "../../../services/CartService.js";
import ReviewCard from "../../../components/ReviewCard/index.js";
import ModalRating from "../../../components/ModalRating/index.js";
function CourseDetail() {
  const { id } = useParams();
  console.log("id-param:", id);
  const [course, setCourse] = useState({});
  const [content, setContent] = useState();
  useEffect(() => {
    const fetchDetail = async () => {
      const res = await CourseService.getDetailCourse(id);
      console.log("data:", res);
      setCourse(res);
    };
    fetchDetail();
  }, [id]);
  useEffect(() => {
    const getCourseContent = async () => {
      const res = await CourseService.getCourseContent(id);
      console.log("content: ", res);
      setContent(res);
    };
    getCourseContent();
  }, [id]);
  const handleaddtocart = async () => {
    await CartService.addToCart(id);
  };
  // fetch đánh giá
  const [rates, setRates] = useState([]);
  useEffect(() => {
    const fetchRating = async () => {
      const res = await CourseService.getRating(id);
      setRates(res);
      console.log("ratingggg:", res);
    };
    fetchRating();
  }, [id]);
  //------------Oánh giá------------------
  const [isOpen, setIsOpen] = useState();
  const handleOpenModelRating = () => {
    setIsOpen(true);
  };
  const handleCloseModelRating = () => {
    setIsOpen(false);
  };
  // ktra đã đánh giá chưa
  const [isRating, setIsRating] = useState(false);
  useEffect(() => {
    const checkRating = async () => {
      const res = await CourseService.checkRating(id);
      setIsRating(res.result);
    };
    checkRating();
  }, [id]);

  /// thêm message khi đánh giá thành công
  const handleSubmitRating = async (val) => {
    console.log("form rating:", val);

    if (isRating) {
      alert("đã đánh giá");
      setIsOpen(false);
    } else {
      try {
        const res = await CourseService.ratingCourse(val, id);
        //set rates ở trong này nữa
        console.log("đánh giá:", res);
        setRates((prev) => [...prev, res.data.result]);

        setIsOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //tính toán thông số
  const avgRate =
    rates.length > 0
      ? rates.reduce((sum, item) => sum + item.rate, 0) / rates.length
      : 0;
  return (
    <div className="course-detail">
      {isOpen && (
        <div className="modal-overlay">
          <ModalRating
            onCloseModal={handleCloseModelRating}
            onSubmitRating={handleSubmitRating}
          />
        </div>
      )}
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
            {course.isPurchased ? (
              <Link
                to={`/mycourses/${id}`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <Button type="primary" className="btn-mycourse">
                  Chuyển đến khóa học
                </Button>
              </Link>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "60px",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                }}
              >
                <Button
                  type="primary"
                  className="btn-addcart"
                  onClick={handleaddtocart}
                >
                  Thêm
                  <ShoppingCartOutlined />
                </Button>
                <Button type="primary" className="btn-buy">
                  Mua ngay
                </Button>
              </div>
            )}
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
        <CourseContent lessons={content?.lessons} />
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontWeight: "600",
              fontSize: "30px",
              color: "#000",
            }}
          >
            Xếp hạng và đánh giá
          </span>
          {course.isPurchased ? (
            <div className="rating-click" onClick={handleOpenModelRating}>
              Đánh giá khóa học
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="rating-summary">
          <div>
            <div className="rating-score">{avgRate}</div>
            <div className="rating-stars">
              <Rate
                disabled
                allowHalf
                value={avgRate}
                style={{ fontSize: "14px", color: "#3B8562" }}
              />
            </div>
            <div className="rating-count">{rates.length} bài đánh giá</div>
          </div>
          
          <div className="rating-distribute">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = rates.filter((r) => r.rate === star).length;
              const percent = rates.length ? (count / rates.length) * 100 : 0;

              return (
                <li
                  key={star}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span>{star}</span>
                  <div className="rating_bar">
                    <div
                      className="rating_bar_child"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </div>
        </div>

        {rates.map((val, index) => (
          <ReviewCard
            key={index}
            avatarUrl={val.user.avatarUrl}
            fullName={val.user.fullName}
            rate={val.rate}
            comment={val.comment}
            time={val.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
export default CourseDetail;

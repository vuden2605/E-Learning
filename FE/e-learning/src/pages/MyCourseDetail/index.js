import { useEffect, useState } from "react";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import { CourseService } from "../../services/CourseService";
import logo from "../../assets/images/logo.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import CourseContent from "../../components/CourseContent";

function MyCourseDetail() {
  const { id } = useParams();
  console.log("id-param:", id);
  const [content, setContent] = useState();
  useEffect(() => {
    const getCourseContent = async () => {
      const res = await CourseService.getCourseContent(id);
      console.log("content: ", res);
      setContent(res);
    };
    getCourseContent();
  }, []);
  return (
    <div className="mycourse-detail">
      <div className="course-header">
        <LeftOutlined
          style={{ fontSize: "20px", marginLeft: "20px", color: "#fff" }}
        />
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" height="40px" width="65px" />
          </Link>
        </div>
        <div className="title"> {content ? content.title : ""}</div>
      </div>
      <div className="course-content">
        <div className="lesson">
          <div className="video">hiện video</div>
          <div className="lesson-content">doc của bài họcdoc của bài học</div>
        </div>
        <div className="sidebar-menu">
          <div style={{ fontWeight: "600", padding: "15px 10px" }}>
            Nội dung khóa học
          </div>
          <CourseContent lessons={content?.lessonResponses} />
        </div>
      </div>
      <div className="course-footer">
        {" "}
        <Button className="btn-prev">
          <LeftOutlined style={{ color: "#1772B5" }} />
          <span
            style={{
              background: "linear-gradient(45deg, #1772B5, #f06595)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            BÀI TRƯỚC
          </span>
        </Button>
        <Button className="btn-next">
          BÀI TIẾP THEO
          <RightOutlined className="next" />
        </Button>
      </div>
    </div>
  );
}
export default MyCourseDetail;

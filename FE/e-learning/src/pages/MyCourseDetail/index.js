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
  const [totalMaterial, setTotalMaterial] = useState(0); // tổng số material

  // lấy content khóa học
  useEffect(() => {
    const getCourseContent = async () => {
      try {
        const res = await CourseService.getCourseContent(id);
        console.log("content: ", res);
        setContent(res);

        // tính tổng số materials
        const totalMaterials =
          res?.lessonResponses?.reduce(
            (sum, lesson) => sum + (lesson.materials?.length || 0),
            0
          ) || 0;
        setTotalMaterial(totalMaterials);
      } catch (err) {
        console.error("Lỗi load course content:", err);
      }
    };
    getCourseContent();
  }, [id]);

  // material active
  const [idMaterial, setIdMaterial] = useState(null);
  const [urlVideo, setUrlVideo] = useState("");

  // gọi API mỗi khi idMaterial thay đổi
  useEffect(() => {
    if (!idMaterial) return;
    const fetchMaterial = async () => {
      try {
        const res = await CourseService.getMaterialById(id, idMaterial);
        console.log("Link video:", res);
        setUrlVideo(res);
      } catch (err) {
        console.error("Lỗi khi gọi material:", err);
      }
    };
    fetchMaterial();
  }, [idMaterial, id]);

  // click chọn material
  const handleClickMaterial = (idMat) => {
    console.log("id material click: ", idMat);
    setIdMaterial(idMat);
  };

  // prev/next
  const handleMaterialPrev = () => {
    if (idMaterial > 1) setIdMaterial(idMaterial - 1);
  };

  const handleMaterialNext = () => {
    if (idMaterial < totalMaterial) setIdMaterial(idMaterial + 1);
  };

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
        <div className="title">{content ? content.title : ""}</div>
      </div>

      <div className="course-content">
        <div className="lesson">
          <div className="video">
            <video
              className="video-content"
              controls
              controlsList="nodownload"
              src={urlVideo}
            >
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
          <div className="lesson-content">
            {
              content?.lessonResponses
                ?.flatMap((lesson) => lesson.materials || [])
                .find((mat) => mat.id === idMaterial)?.description
            }
          </div>
        </div>

        <div className="sidebar-menu">
          <div style={{ fontWeight: "600", padding: "15px 10px" }}>
            Nội dung khóa học
          </div>
          <CourseContent
            lessons={content?.lessons}
            materialOnclick={handleClickMaterial}
            idMaterialParent={idMaterial}
          />
        </div>
      </div>

      <div className="course-footer">
        <Button className="btn-prev" onClick={handleMaterialPrev}>
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
        <Button className="btn-next" onClick={handleMaterialNext}>
          BÀI TIẾP THEO
          <RightOutlined className="next" />
        </Button>
      </div>
    </div>
  );
}

export default MyCourseDetail;

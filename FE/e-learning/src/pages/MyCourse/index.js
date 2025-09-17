import "./style.scss";
import MyCourse from "../../components/MyCourseCard";
import { useState, useEffect } from "react";
import { CourseService } from "../../services/CourseService";

function Mycourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("Chưa đăng nhập");
        return;
      }

      try {
        const data = await CourseService.getMycourse({ token, page: 0, pageSize: 1000});
        console.log("mycourse", data.result);
        setCourses(data.result.content);
      } catch (err) {
        console.error("Lỗi khi fetch my courses:", err);
      }
    };

    fetchMyCourses();
  }, []);
  return (
    <div className="mycourse" style={{ color: "#000" }}>
      <div
        style={{ fontWeight: "700", fontSize: "30px", marginBottom: "20px" }}
      >
        Khóa học của tôi
      </div>
      <div className="mycourse-container">
        {courses.map((val) => (
          <MyCourse
            key={val.courseResponse.id}
            title={val.courseResponse.title}
            thumbnailUrl={val.courseResponse.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
}
export default Mycourses;

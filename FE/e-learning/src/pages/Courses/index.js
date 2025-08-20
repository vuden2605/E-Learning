import Mycourse from "../../components/MyCourseCard";
import CourseCard from "../../components/CourseCard";
import "./style.scss";
import searchimg from "../../assets/images/search.png";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Pagination } from "antd";

function Courses() {
  const { Search } = Input;

  return (
    <div className="course">
      <div className="my-course tab">
        <h1
          style={{
            fontSize: "20px",
            color: "#2F327D",
            paddingLeft: "70px",
            fontWeight: "500",
          }}
        >
          Khóa học của tôi
        </h1>
        <div
          className="container"
          style={{
            paddingLeft: "70px",
            paddingRight: "20px",
            display: "flex",
            gap: "50px",
          }}
        >
          <Mycourse />
          <Mycourse />
          <Mycourse />
        </div>
        <div className="square-outlined">
          <LeftSquareOutlined
            style={{
              fontSize: "30px",
              color: "#fff",
              backgroundColor: "#6AB9BC",
              borderRadius: "5px",
            }}
          />
          <RightSquareOutlined
            style={{
              fontSize: "30px",
              color: "#fff",
              backgroundColor: "#6AB9BC",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
      <div className="course-search">
        <img src={searchimg} style={{ width: "1150px" }}></img>
        <Search
          placeholder="Search your favourite course"
          enterButton={
            <Button
              type="primary"
              style={{
                backgroundColor: "#6AB9BC",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",

                padding: "0 20px",
              }}
            >
              Search
            </Button>
          }
          size="large"
          onSearch={(value) => console.log(value)}
          className="btnSearch"
        />
      </div>
      <div className="list-course">
        <div className="filter">
          <div
            style={{
              padding: "10px",
              paddingLeft: "80px",
              borderBottom: "2px solid #fff",
              background: "linear-gradient(45deg, #1772B5, #f06595)",
              color: "#fff",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              fontWeight:"600"
            }}
          >
            LỌC KHÓA HỌC
          </div>
        </div>
        <div
          style={{
            width: "800px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="courses">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </div>
          <div className="pagination">
            <Pagination
              defaultCurrent={1}
              total={50}
              style={{ paddingLeft: "250px", backgroundColor: "#f5f5f5" }}
            />
          </div>
        </div>
      </div>
      <div className="top-course">
        <div
          style={{
            fontSize: "50px",
            fontWeight: "700",
            marginBottom: "20px",
            marginTop: "20px",
            background: "linear-gradient(45deg, #1772B5, #f06595)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          KHÓA HỌC BÁN CHẠY
        </div>
        <div style={{ display: "flex", width: "1150px", gap: "40px" }}>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
}
export default Courses;

import Mycourse from "../../components/MyCourseCard";
import CourseCard from "../../components/CourseCard";
import "./style.scss";
import searchimg from "../../assets/images/search.png";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  FunnelPlotOutlined,
} from "@ant-design/icons";
import { Input, Button, Space, Radio, Slider } from "antd";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { CourseService } from "../../services/CourseService";
import { CategoryService } from "../../services/CategoryService";

function Courses() {
  const { Search } = Input;

  //fetch course & category
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({});
  const fetchCourses = async () => {
    try {
      const data = await CourseService.getCourses({
        page: 0,
        pageSize: 6,
        ...filters,
      });
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters]); // mỗi lần filter đổi thì call API
  //Khi reset thì thanh khoảng giá cũng phải về như cữ:
  const [range, setRange] = useState([0, 500]);

  const handleReset = () => {
    console.log("reset");
    setRange([0, 500]); // reset về mặc định
    console.log("range-reset", range);
    setFilters({}); // xoá hết filter -> chỉ còn page, pageSize
  };
  // fetch category
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        setCategorys(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  //-------------------------------------FILTER------------------------------------

  //category
  const handleCategoryChange = (value) => {
    setFilters((pre) => ({ ...pre, categoryId: value }));
  };
  //discount
  // const handleDiscountChange = (value) => {
  //   setFilters((pre) => ({ ...pre, discount: value }));
  // };
  //price
  const handlePriceChange = (value) => {
    const [min, max] = value;
    console.log("min:", min, "max:", max);
    setFilters((pre) => ({ ...pre, minPrice: min, maxPrice: max }));
  };
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
              paddingLeft: "20px",
              borderBottom: "2px solid #fff",
              background: "linear-gradient(45deg, #1772B5, #f06595)",
              color: "#fff",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              fontWeight: "600",
              display: "flex",
              gap: "10px",
            }}
          >
            <FunnelPlotOutlined />
            <span style={{ marginTop: "5px" }}>LỌC KHÓA HỌC</span>
            <Button className="btn-reset" onClick={handleReset}>
              <span
                style={{
                  background: "linear-gradient(45deg, #1772B5, #f06595)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                RESET
              </span>
            </Button>
          </div>
          <div className="category child-filter">
            <span className="filter-name">Kỹ năng</span>
            {categorys.map((ctg) => (
              <li
                key={ctg.id}
                onClick={() => handleCategoryChange(ctg.id)}
                className={filters.categoryId === ctg.id ? "ctg-active" : ""}
              >
                {ctg.name}
              </li>
            ))}
          </div>
          <div className="discount child-filter">
            <span className="filter-name">Mức giảm giá</span>
            <Radio.Group
              // value={filters.discount}
              // onChange={(e) => handleFilterChange("discount", e.target.value)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginLeft: "10px",
                color: "#e4dfdf",
              }}
            >
              <Radio value={5}>Từ 5% trở lên</Radio>
              <Radio value={10}>Từ 10% trở lên</Radio>
              <Radio value={15}>Từ 15% trở lên</Radio>
            </Radio.Group>
          </div>
          <div className="price child-filter">
            <span className="filter-name">Khoảng giá</span>
            <Slider
              range
              min={0}
              max={500}
              step={20}
              value={range}
              onChange={(value) => {
                setRange(value);
                handlePriceChange(value);
              }} // value = [min, max]
              style={{ width: "225px" }}
            />
            <div
              style={{
                display: "flex",
                gap: "100px",
                marginLeft: "4px",
                fontWeight: "500",
              }}
            >
              <div
                style={{
                  backgroundColor: "#EDEDED",
                  color: "#373737ff",
                  width: "30px",
                  height: "25px",
                  display: "flex",
                  borderRadius: "5px",
                  justifyContent: "center", // căn giữa ngang
                  alignItems: "center", // căn giữa dọc
                }}
              >
                0đ
              </div>
              <div
                style={{
                  backgroundColor: "#EDEDED",
                  color: "#373737ff",
                  width: "100px",
                  height: "25px",
                  display: "flex",
                  borderRadius: "5px",
                  justifyContent: "center", // căn giữa ngang
                  alignItems: "center", // căn giữa dọc
                }}
              >
                1 000 000đ
              </div>
            </div>
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
            {courses.map((val) => (
              <CourseCard
                key={val.id}
                title={val.title}
                description={val.description}
                price={val.price}
                discount={0.5}
                thumbnailUrl={val.thumbnailUrl}
              />
            ))}
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
        <div
          style={{
            display: "flex",
            width: "1150px",
            gap: "40px",
            marginBottom: "40px",
          }}
        ></div>
      </div>
    </div>
  );
}
export default Courses;

import Mycourse from "../../../components/MyCourseCard";
import CourseCard from "../../../components/CourseCard";
import "./style.scss";
import searchimg from "../../../assets/images/search.png";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  FunnelPlotOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Input, Button, Space, Radio, Slider } from "antd";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { CourseService } from "../../../services/CourseService";
import { CategoryService } from "../../../services/CategoryService";

function AllCourses() {
  const { Search } = Input;
  ///-------phân trang-----------------
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);
  const handlePageChange = (pageNumber) => {
    console.log("trang hiện tại:", pageNumber);
    setPage(pageNumber - 1);
  };
  //fetch course & category
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({});
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const data = await CourseService.getCourses(
        {
          page,
          pageSize: 6,
          ...filters,
        },
        token
      );
      setCourses(data.content);
      console.log(data.content);
      setTotal(data.totalElements);
      console.log(data);
      console.log("số item:", data.totalElements);

      console.log("số item/page:", data.size);
      console.log("số page:", data.totalPages);

      setPageSize(data.size);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters, page]); // mỗi lần filter, chọn page đổi thì call API
  //Khi reset thì thanh khoảng giá cũng phải về như cữ:
  const [range, setRange] = useState([0, 500]);

  const handleReset = () => {
    console.log("reset");
    setRange([0, 500]); // reset về mặc định
    console.log("range-reset", range);
    setSearchValue("");
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
    setPage(0);
  };
  //discount
  const handleDiscountChange = (value) => {
    setPage(0);
    setFilters((pre) => ({ ...pre, discountPercent: value }));
    console.log("Giảm giá:", value);
  };
  //price
  const handlePriceChange = (value) => {
    const [min, max] = value;
    console.log("min:", min, "max:", max);
    setPage(0);
    setFilters((pre) => ({ ...pre, minPrice: min, maxPrice: max }));
  };
  //--------------search---------------
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (value) => {
    // console.log("search:", value);
    try {
      // const data = await CourseService.searchCourse(value);
      // console.log("kết quả:", data);

      setPage(0);
      setFilters((pre) => ({ ...pre, title: value }));
      setSearchValue("");
    } catch (err) {
      console.error(err);
    }
  };
  /////-----------------my course-----------------------
  const [mycourses, setMyCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagetotal, setPagetotal] = useState(0);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("Chưa đăng nhập");
        return;
      }

      try {
        const data = await CourseService.getMycourse({
          token,
          page: currentPage,
          pageSize: 4,
        });
        console.log("mycourse", data.result);
        setMyCourses(data.result.content);
        setPagetotal(data.result.totalPages);
        console.log("số page: ", pagetotal);
        console.log("page hien tai:", currentPage);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyCourses();
  }, [currentPage]);
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pagetotal - 1) {
      setCurrentPage(currentPage + 1);
    }
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
            gap: "20px",
          }}
        >
          {mycourses.map((val) => (
          <Mycourse
            key={val.courseResponse.id}
            title={val.courseResponse.title}
            thumbnailUrl={val.courseResponse.thumbnailUrl}
          />
        ))}
        </div>
        <div className="square-outlined">
          <LeftSquareOutlined
            onClick={handlePrevPage}
            style={{
              fontSize: "30px",
              color: "#fff",
              backgroundColor: "#6AB9BC",
              borderRadius: "5px",
            }}
          />
          <RightSquareOutlined
            onClick={handleNextPage}
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
          className="btnSearch"
          onSearch={handleSearch}
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
              value={filters.discountPercent}
              onChange={(e) => handleDiscountChange(e.target.value)}
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
                id={val.id}
                title={val.title}
                description={val.description}
                price={val.price}
                discount={val.discountPercent}
                thumbnailUrl={val.thumbnailUrl}
              />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              current={page + 1}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              // showSizeChanger
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
export default AllCourses;

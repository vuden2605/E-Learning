import { Link } from "react-router-dom";
import "./style.scss";

function Mycourse({ title, thumbnailUrl, id }) {
  return (
    <div className="card">
      <Link to={`/mycourses/${id}`} style={{ textDecoration: "none" }}>
        <div className="card-img">
          <img src={thumbnailUrl}></img>
          {/* <img src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"></img> */}
        </div>
        <div className="card-content">
          <div style={{ padding: "10px" }}>
            <div>
              <h1 className="card-name">{title}</h1>
            </div>
            <div
              style={{
                paddingTop: "5px",
                paddingBottom: "5px",
                fontSize: "14px",
              }}
            >
              Tiến độ
            </div>
            <div className="progress">
              <div className="progress__bar"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default Mycourse;

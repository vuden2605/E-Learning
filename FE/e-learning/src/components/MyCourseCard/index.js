import "./style.scss";
function Mycourse({ title, thumbnailUrl }) {
  return (
    <div className="card">
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
    </div>
  );
}
export default Mycourse;

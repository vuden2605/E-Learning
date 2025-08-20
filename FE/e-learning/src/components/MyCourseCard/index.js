import "./style.scss";
function Mycourse() {
  return (
    <div className="card">
      <div className="card-img">
        <img src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"></img>
      </div>
      <div className="card-content">
        <div style={{ padding: "16px" }}>
          <div>
            <h1 className="card-name">Lập Trình JavaScript Cơ Bản</h1>
          </div>
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
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

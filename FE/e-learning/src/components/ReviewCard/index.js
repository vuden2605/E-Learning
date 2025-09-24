import "./style.scss";
import { Button, Rate, Collapse } from "antd";

function ReviewCard({avatarUrl, fullName, rate, comment, time}) {
  return (
    <div className="review-card">
      <div className="review-header">
        <img src={avatarUrl}></img>
        <span className="name">{fullName}</span>
      </div>
      <div className="review-rating">
        <div className="rate-start">
          <Rate
            disabled
            defaultValue={rate}
            className="custom-rate"
            style={{ fontSize: "9px", color: "#3B8562" }}
          />
        </div>
        <div className="date">13 tháng 8, 2025</div>
      </div>
      <div className="review-content">{comment}</div>
    </div>
  );
}
export default ReviewCard;

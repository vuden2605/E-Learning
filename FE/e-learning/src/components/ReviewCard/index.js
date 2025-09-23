import "./style.scss"
import { Button, Rate, Collapse } from "antd";
import cmtavt from "../../assets/images/cmt_avt.jpg";

function ReviewCard(){
    return ( <div className="review-card">
          <div className="review-header">
            <img src={cmtavt}></img>
            <span className="name">J97</span>
          </div>
          <div className="review-rating">
            <div className="rate-start">
              <Rate
                disabled
                defaultValue={4.6}
                className="custom-rate"
                style={{ fontSize: "9px", color: "#3B8562" }}
              />
            </div>
            <div className="date">13 tháng 8, 2025</div>
          </div>
          <div className="review-content">
            Nhồng nhần nhên nhôi nhánh nhay nhọa nhời nhem nhong nhút nhây nhừ
            nhày nhơ nhấy nhòn nhủ nhơ nhến nhi nhem nhờ nhơ nhòng nhười nhanh
            nhâu nhó nhay nhột nhày nhi nhỗ nhánh nhay
          </div>
        </div>)
}
export default ReviewCard;
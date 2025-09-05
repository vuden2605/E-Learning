import { Rate } from "antd";
import { TagOutlined } from "@ant-design/icons";

import "./style.scss";
import { formatCurrencyVND } from "../../utils/formatCurrency";

function CartItem({ id, thumbnail, title, author }) {
  return (
    <div className="cart-item">
      <div className="item-thumbnail">
        {/* <img src={thumbnail}></img> */}
        <img src="https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png"></img>
      </div>
      <div className="item-info">
        {/* <div className="info-title">{title}</div> <div className="info-author">{author}</div> <div className="info-rating"></div> */}
        <div className="info-title">
          Lập Trình Python Từ Cơ Bản Đến Nâng Cao Trong 30 Ngày
        </div>
        <div className="info-author">Bởi AI Coding</div>
        <div className="info-rating">
          <span className="rate-number">4.6</span>
          <div className="rate-start">
            <Rate
              disabled
              defaultValue={4.6}
              className="custom-rate"
              style={{ fontSize: "9px", color: "#B9752B" }}
            />
          </div>
          <div className="rate-count">(805 xếp hạng)</div>
        </div>
      </div>
      <div className="item-delete">
        <button className="btn-delete">Xóa</button>
      </div>
      <div className="item-price">
        <div className="new-price">{formatCurrencyVND(2500000)} <TagOutlined rotate={270} style={{color:"#652cca"}}/></div>
        <div className="old-price">
          <s>
            <i>{formatCurrencyVND(5000000)}</i>
          </s>
        </div>
      </div>
    </div>
  );
}
export default CartItem;

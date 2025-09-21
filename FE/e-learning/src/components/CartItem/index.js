import { Rate } from "antd";
import { TagOutlined } from "@ant-design/icons";
import "./style.scss";
import { formatCurrencyVND } from "../../utils/formatCurrency";

function CartItem({
  id,
  thumbnail,
  title,
  author,
  rating,
  ratingCount,
  newPrice,
  oldPrice,
  onDelete,
}) {
  return (
    <div className="cart-item">
      <div className="item-thumbnail">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="item-info">
        <div className="info-title">{title}</div>
        <div className="info-author">Bởi {author}</div>
        <div className="info-rating">
          <span className="rate-number">{rating}</span>
          <div className="rate-start">
            <Rate
              disabled
              defaultValue={rating}
              className="custom-rate"
              style={{ fontSize: "9px", color: "#B9752B" }}
            />
          </div>
          <div className="rate-count">({ratingCount} xếp hạng)</div>
        </div>
      </div>

      <div className="item-delete">
        <button className="btn-delete" onClick={() => onDelete?.(id)}>
          Xóa
        </button>
      </div>

      <div className="item-price">
        <div className="new-price">
          {formatCurrencyVND(newPrice)}{" "}
          <TagOutlined rotate={270} style={{ color: "#652cca" }} />
        </div>
        {oldPrice && (
          <div className="old-price">
            <s>
              <i>{formatCurrencyVND(oldPrice)}</i>
            </s>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;

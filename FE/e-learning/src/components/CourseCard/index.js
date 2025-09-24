import "./style.scss";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatCurrencyVND } from "../../utils/formatCurrency";
import { CartService} from "../../services/CartService.js";
function CourseCard({
  title,
  description,
  price,
  discount,
  thumbnailUrl,
  id,
  isPurchased,
}) {
  const addToCart = async () => {
    await CartService.addToCart(id);
  }
  return (
    <div className="coursecard">
      <Link to={`/course/detail/${id}`} style={{ textDecoration: "none" }}>
        <div className="img-course">
          <img src={thumbnailUrl}></img>
        </div>
        <div className="title">
          <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
            {title}
          </h1>
        </div>
        <div className="description">
          {description}

        </div>
      </Link>

      <div className="price-tag">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="old-price">
            <del>
              <i>{formatCurrencyVND(price)}</i>
            </del>
          </div>
          <div className="new-price">
            {formatCurrencyVND((price * (100 - discount)) / 100)}
          </div>
        </div>
        {isPurchased ? (
          <Link
            to={`/mycourses/${id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button type="primary" className="btn-mycourse">
              Chuyển đến khóa học
            </Button>
          </Link>
        ) : (
          <Button type="primary" className="btn-addcart" onClick = {() => addToCart(id)}>
            <ShoppingCartOutlined />
            Thêm vào giỏ
          </Button>
        )}
      </div>
    </div>
  );
}
export default CourseCard;

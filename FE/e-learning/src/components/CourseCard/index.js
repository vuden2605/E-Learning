import "./style.scss";
import { Button, notification } from "antd";
import { FrownOutlined, ShoppingCartOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatCurrencyVND } from "../../utils/formatCurrency";
import { CartService } from "../../services/CartService.js";
function CourseCard({
  title,
  description,
  price,
  discount,
  thumbnailUrl,
  id,
  isPurchased,
}) {
  const [api, contextHolder] = notification.useNotification();

  const addToCart = async () => {
    try {
      await CartService.addToCart(id);

      api.open({
        message: "Thông báo!",
        description: "Thêm vào giỏ hàng thành công",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        showProgress: true,
        zIndex: 3000,
        pauseOnHover: false,
        duration: 1.5,
      });
    } catch (error) {
      api.open({
        message: "Lỗi!",
        description: "Sản phẩm đã có trong giỏ hàng",
        icon: <FrownOutlined style={{ color: "red" }} />,
        showProgress: true,
        zIndex: 3000,
        pauseOnHover: false,
        duration: 2,
      });
    }
  };

  return (
    <div className="coursecard">
      {contextHolder}

      <Link to={`/course/detail/${id}`} style={{ textDecoration: "none" }}>
        <div className="img-course">
          <img src={thumbnailUrl}></img>
        </div>
        <div className="title">
          <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
            {title}
          </h1>
        </div>
        <div className="description">{description}</div>
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
          <Button
            type="primary"
            className="btn-addcart"
            onClick={() => addToCart(id)}
          >
            <ShoppingCartOutlined />
            Thêm vào giỏ
          </Button>
        )}
      </div>
    </div>
  );
}
export default CourseCard;

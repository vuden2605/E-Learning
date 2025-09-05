import { useState } from "react";
import "./style.scss";
import CartItem from "../../components/CartItem";
import { formatCurrencyVND } from "../../utils/formatCurrency";
import { ArrowRightOutlined } from "@ant-design/icons";

function CartDetail() {
  const [cartItems, setCartItems] = useState([]);
  const cartCount = 3; //cartItems.length
  return (
    <div className="cartdetail">
      <div className="cart-container">
        <h1>Giỏ hàng</h1>
        <div style={{ display: "flex", gap: "60px" }}>
          <div className="cart-content">
            <div className="cart-header" style={{ fontWeight: "600" }}>
              {cartCount} khóa học trong giỏ hàng
            </div>
            <div className="cart-list">
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
          </div>
          <div className="cart-summary">
            <div style={{color:"#5A5C71",fontWeight:"600"}}>Tổng:</div>
            <div className="total-price">{formatCurrencyVND(7000000)}</div>
            <button className="btn-checkount">Tiến hành thanh toán <ArrowRightOutlined /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartDetail;

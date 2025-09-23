import { useState, useEffect } from "react";
import "./style.scss";
import CartItem from "../../components/CartItem";
import { formatCurrencyVND } from "../../utils/formatCurrency";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CartService } from "../../services/CartService";
import { CheckoutService } from "../../services/CheckoutService";
function CartDetail() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await CartService.getMyCart();
        console.log("cart items:", res);
        setCartItems(res || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCartItems();
  }, []);
  const handleCheckout = async () => {
    const urlMomo = await CheckoutService.checkout();
    if (urlMomo) {
      window.location.href = urlMomo; 
    }
  };
  const handleRemoveItem = async (id) => {
    await CartService.removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }
  console.log("cartItems:", cartItems);
  const cartCount = cartItems.length;

  // Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Math.round(item.price*(1-item.discountPercent/100)) || 0),
    0
  );

  return (
    <div className="cartdetail">
      <div className="cart-container">
        <h1>Giỏ hàng</h1>
        <div style={{ display: "flex", gap: "60px" }}>
          {/* Nội dung giỏ hàng */}
          <div className="cart-content">
            <div className="cart-header" style={{ fontWeight: "600" }}>
              {cartCount} khóa học trong giỏ hàng
            </div>
            <div className="cart-list">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    thumbnail={item.thumbnailUrl}
                    title={item.title}
                    author={item.instructor.user.email}
                    rating={item.averageRating}
                    ratingCount={item.totalRatings}
                    newPrice={Math.round(item.price*(1-item.discountPercent/100))}
                    oldPrice={item.price}
                    onDelete={(id) =>
                      handleRemoveItem(id)
                    }
                  />
                ))
              ) : (
                <p>Giỏ hàng trống</p>
              )}
            </div>
          </div>

          {/* Tóm tắt giỏ hàng */}
          <div className="cart-summary">
            <div style={{ color: "#5A5C71", fontWeight: "600" }}>Tổng:</div>
            <div className="total-price">{formatCurrencyVND(totalPrice)}</div>
            <button className="btn-checkount"  onClick = {handleCheckout}>
              Tiến hành thanh toán <ArrowRightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetail;

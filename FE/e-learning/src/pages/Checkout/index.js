import React, { useState } from "react";
import "./style.scss";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [visaInfo, setVisaInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  // Giả lập danh sách khóa học đã đăng ký
  const courses = [
    { id: 1, name: "ReactJS Cơ bản", price: 1200000 },
    { id: 2, name: "NodeJS Nâng cao", price: 1500000 },
    { id: 3, name: "Database Oracle", price: 1000000 },
  ];

  const total = courses.reduce((sum, c) => sum + c.price, 0);

  const handlePay = () => {
    if (paymentMethod === "visa") {
      const { cardNumber, expiry, cvv, cardHolder } = visaInfo;
      if (!cardNumber || !expiry || !cvv || !cardHolder) {
        alert("Vui lòng điền đầy đủ thông tin thẻ Visa!");
        return;
      }
      alert(`Thanh toán bằng VISA thành công!`);
    } else {
      alert(`Thanh toán bằng MoMo thành công!`);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Thanh toán khóa học</h1>

      <div className="checkout-content">
        {/* Danh sách khóa học */}
        <div className="checkout-courses">
          <h2>Khóa học của bạn</h2>
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <span>{course.name}</span>
              <span>{course.price.toLocaleString()} đ</span>
            </div>
          ))}
          <div className="course-total">
            <strong>Tổng cộng:</strong>
            <strong>{total.toLocaleString()} đ</strong>
          </div>
        </div>

        {/* Thanh toán */}
        <div className="checkout-payment">
          <h2>Phương thức thanh toán</h2>

          <label className={`payment-option ${paymentMethod === "momo" ? "active" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              alt="Momo"
            />
            Ví MoMo
          </label>

          <label className={`payment-option ${paymentMethod === "visa" ? "active" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
            />
            Thẻ Visa
          </label>

          {/* Form Visa */}
          {paymentMethod === "visa" && (
            <div className="visa-form">
              <input
                type="text"
                placeholder="Số thẻ (xxxx xxxx xxxx xxxx)"
                value={visaInfo.cardNumber}
                onChange={(e) => setVisaInfo({ ...visaInfo, cardNumber: e.target.value })}
              />
              <div className="visa-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={visaInfo.expiry}
                  onChange={(e) => setVisaInfo({ ...visaInfo, expiry: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={visaInfo.cvv}
                  onChange={(e) => setVisaInfo({ ...visaInfo, cvv: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Tên chủ thẻ"
                value={visaInfo.cardHolder}
                onChange={(e) => setVisaInfo({ ...visaInfo, cardHolder: e.target.value })}
              />
            </div>
          )}

          <button className="pay-btn" onClick={handlePay}>
            Thanh toán ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

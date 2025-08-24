import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram , FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import './style.scss';
import logo from '../../assets/images/logo.png'
const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="app-container" style={{marginTop:'-30px'}}>      

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            
            {/* Company Info */}
            <div className="footer-section company-info">
              <div className="brand">
                {/* <div className="logo"> */}
                  <img src={logo} alt='logo'style={{width:"100px"}}/>
                {/* </div> */}
                <h3>EduPlatform</h3>
              </div>
              <p className="description">
                Nền tảng học trực tuyến với hàng nghìn khóa học chất lượng cao 
                từ các chuyên gia và giảng viên hàng đầu trong ngành.
              </p>
              <div className="social-links">
                <a href="#" className="social-link facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link twitter">
                    <FaTwitter />
                </a>
                <a href="#" className="social-link instagram">
                    <FaInstagram />

                </a>
                <a href="#" className="social-link youtube">
                    <FaYoutube />
                </a>
                <a href="#" className="social-link linkedin">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Courses */}
            <div className="footer-section">
              <h4>Danh Mục Khóa Học</h4>
              <ul className="footer-links">
                <li><a href="#">Lập Trình Web</a></li>
                <li><a href="#">Mobile Development</a></li>
                <li><a href="#">Data Science & AI</a></li>
                <li><a href="#">UI/UX Design</a></li>
                <li><a href="#">Digital Marketing</a></li>
                <li><a href="#">Business & Management</a></li>
                <li><a href="#">Kỹ Năng Mềm</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h4>Hỗ Trợ Học Viên</h4>
              <ul className="footer-links">
                <li><a href="#">Trung Tâm Trợ Giúp</a></li>
                <li><a href="#">Hướng Dẫn Sử Dụng</a></li>
                <li><a href="#">Chính Sách Hoàn Tiền</a></li>
                <li><a href="#">Liên Hệ Hỗ Trợ</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Báo Cáo Lỗi</a></li>
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="footer-section newsletter-section">
              <h4>Kết Nối Với Chúng Tôi</h4>
              <p>Đăng ký nhận thông tin khóa học mới và ưu đãi đặc biệt</p>
              
              <div className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="newsletter-input"
                />
                <button
                  onClick={handleSubscribe}
                  className={`newsletter-btn ${subscribed ? 'success' : ''}`}
                >
                  {subscribed ? (
                    <>
                      <i className="fas fa-check"></i>
                      Đã Đăng Ký!
                    </>
                  ) : (
                    'Đăng Ký'
                  )}
                </button>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>Hotline: 1900 1234</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>support@eduplatform.vn</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Đường Lê Lợi, Q.1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-section">
            <div className="trust-badges">
              <div className="trust-badge">
                <i className="fas fa-shield-alt"></i>
                <span>Thanh Toán Bảo Mật</span>
              </div>
              <div className="trust-badge">
                <i className="fas fa-certificate"></i>
                <span>Chứng Chỉ Uy Tín</span>
              </div>
              <div className="trust-badge">
                <i className="fas fa-users"></i>
                <span>100,000+ Học Viên</span>
              </div>
              <div className="trust-badge">
                <i className="fas fa-headset"></i>
                <span>Hỗ Trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © 2025 EduPlatform. Tất cả quyền được bảo lưu.
              </p>
              <div className="bottom-links">
                <a href="#">Chính Sách Bảo Mật</a>
                <a href="#">Điều Khoản Sử Dụng</a>
                <a href="#">Chính Sách Cookie</a>
                <a href="#">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

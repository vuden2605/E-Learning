import{ NavLink,Link } from 'react-router-dom';
import './style.scss';
import { RiHome9Line } from "react-icons/ri";
import { TbRoad } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import logo from '../../images/logo.png';
import { Button } from 'antd';
function Navigation() {
  return (
      <ul className="navigation">
            <div className='logo'>
                <Link to="/">
                    <img src={logo} alt="Logo" height='70px' width='70px'/>
                </Link>
                <Link to="/" className='logo-text'>
                <span className='logo-text-1'>Chắc Kiến Thức</span>
                <span className='logo-text-2'>Vững Tương Lai</span>
                </Link>
            </div>
            <div className='nav-list'>
                <NavLink to="/" className="nav-item" >
                {/* <RiHome9Line className="nav-icon" /> */}
                Trang chủ
            </NavLink>
            <NavLink to="/courses" className="nav-item" >
                {/* <TbRoad className="nav-icon" /> */}
                Khóa học
            </NavLink>
            <NavLink to="/careers" className="nav-item" >
                {/* <BsFillPostcardHeartFill className="nav-icon" /> */}
                Nghề nghiệp
            </NavLink>
            <NavLink to="/blog" className="nav-item" >
                Blog
            </NavLink>
            <NavLink to="/about" className="nav-item" >
                About Us
            </NavLink>
            </div>
            
            <div className='sign-in-up'>
                <Link to="/login">
                <Button type="primary" shape="round" size='large'>
            Đăng nhập
          </Button>
                </Link>
                <Link to="/register">
                <Button type='text' shape="round" size='large' className='register-btn'>
            Đăng ký
          </Button>
                </Link>
            </div>
            
      </ul>
  );
}
export default Navigation;
import './style.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Input,Button } from 'antd';
const { Search } = Input;
function Header() {
    const onSearch = (value) =>{
        console.log(value);
        // onClear();
    } 
    return (
        <div className="header">
            <div className='logo'>
                <Link to="/">
                    <img src={logo} alt="Logo" height='70px' width='70px'/>
                </Link>
                <Link to="/" className='logo-text'>
                <span className='logo-text-1'>Chắc Kiến Thức</span>
                <span className='logo-text-2'>Vững Tương Lai</span>
                </Link>
            </div>
            <div className='find'>
                <Search className='search' placeholder="Tìm kiếm khóa học, video..." onSearch={onSearch} enterButton />
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
        </div>
    );
}
export default Header;
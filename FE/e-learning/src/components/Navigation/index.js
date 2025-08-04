import{ NavLink } from 'react-router-dom';
import './style.scss';
import { RiHome9Line } from "react-icons/ri";
import { TbRoad } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
function Navigation() {
  return (
      <ul className="navigation">
        <li className ='navigate-item'>
          <NavLink  to="/" >
          <RiHome9Line/>
          <span>Trang chủ</span>
          </NavLink>
        </li>
        <li className ='navigate-item'>
          <NavLink to="/learning-paths" >
          <TbRoad/>
          <span>Lộ trình</span>
          </NavLink>
        </li>
        <li className ='navigate-item'>
          <NavLink to="/posts" >
          <BsFillPostcardHeartFill/>
          <span>Bài viết</span>
          </NavLink>
        </li>
      </ul>
  );
}
export default Navigation;
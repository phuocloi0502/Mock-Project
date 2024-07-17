import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Input, Spin, Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import "./header.scss";
import UserAvatar from "./../../assets/user_avatar.avif";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Cart from "../../pages/Cart/Cart";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getAll } from "../../redux/slide/categorySlide";
import {
  changeIsLogin,
  changeUserName,
  setUserId,
} from "../../redux/slide/userSlide";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "../../utils/helpers";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { Search } = Input;
  // get category
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.categorySlide.listCategory);
  const loading = useSelector((state) => state.categorySlide.loading);
  // isLogin

  const token = getToken();

  useEffect(() => {
    if (token) {
      try {
        dispatch(changeIsLogin(true));

        const decoded = jwtDecode(token);
        console.log(decoded); // show decoded
        dispatch(changeUserName(decoded?.username));
        dispatch(setUserId(decoded?.userId));
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  const isLogin = useSelector((state) => state.userSlide.isLogin);
  const userName = useSelector((state) => state.userSlide.userName);
  const [styleHide, setStyleHide] = useState({});
  useEffect(() => {
    if (userName === "") {
      setStyleHide({ display: "none" });
    } else {
      console.log(userName);
      setStyleHide({});
    }
  }, [userName, isLogin]);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const demo = () => {
    console.log("isLogin", isLogin);
  };

  return (
    <div className="wrapper-header">
      <Spin tip="Loading..." fullscreen spinning={loading} />
      <Drawer
        className="custom-drawer"
        title={
          <div className="drawer-title">
            <p>Giỏ Hàng </p>
            <FaCartPlus />
          </div>
        }
        onClose={onClose}
        open={open}
        closeIcon={<IoIosCloseCircleOutline className="close-icon" />}
      >
        <Cart />
      </Drawer>
      <Link to={"/"}>
        <div className="logo-area">
          <div className="logo-web">
            <GiForkKnifeSpoon />
          </div>
          <div className="title-web">VTI-FOOD</div>
        </div>
      </Link>
      <div className="menu-area">
        <div className="wrapper-menu">
          <ul className="main-menu ">
            <li className="item">
              <Link to="/">Trang Chủ</Link>
            </li>
            <li className="item">
              <Link to={"/product"}>Thực Đơn</Link>
              <span>
                {" "}
                <FaChevronDown />{" "}
              </span>
              <ul className="sub-menu">
                {listCategory.map((item, index) => (
                  <li className="sub-item" key={index}>
                    <Link to={`/category/${item.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="item">
              <Link to={"/my_account"}>Tài Khoản</Link>
              <span>
                {" "}
                <FaChevronDown />{" "}
              </span>
              <ul className="sub-menu">
                <li className="sub-item">
                  <Link to="/my_account">Thông tin của tôi</Link>
                </li>
                <li className="sub-item">
                  <Link to="/my_order">Lịch sử đặt hàng</Link>
                </li>
                <li className="sub-item">
                  <Link to="/wish_list"> Yêu thích</Link>
                </li>
              </ul>
            </li>
            <li className="item">
              <Link
                onClick={() => {
                  dispatch(changeIsLogin(false));
                  dispatch(changeUserName(""));
                  dispatch(setUserId(""));
                  setStyleHide({ display: "none" });
                  localStorage.removeItem("token");
                }}
                to={"/login"}
              >
                {isLogin ? <> Đăng xuất</> : <> Đăng nhập</>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="button-area">
        <div className=" search">
          <Search
            placeholder="Tìm kiếm"
            allowClear
            // onSearch={}
          />
        </div>
        <div className="icon like" onClick={demo}>
          <FcLike />
        </div>
        <div className="icon cart" onClick={showDrawer}>
          <span>2</span>
          <div>
            {" "}
            <FaShoppingCart />
          </div>
        </div>
      </div>

      <div className="user-info-area" style={styleHide}>
        <div className="user-avatar">
          <img src={UserAvatar} alt="" />
        </div>
        <div className="user-name">Hi, {userName} !</div>
      </div>
    </div>
  );
};

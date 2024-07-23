import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoSearchSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Input, Spin, Drawer, Button } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";
import "./header.scss";
import UserAvatar from "./../../assets/user_avatar.avif";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Cart from "../../pages/Cart/Cart";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getAll } from "../../redux/slide/categorySlide";
import { getAllProducts } from "../../redux/slide/productSlide";
import {
  changeIsLogin,
  changeUserName,
  setUserId,
  setRole,
} from "../../redux/slide/userSlide";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "../../utils/helpers";
import { jwtDecode } from "jwt-decode";
import { getCartInfoById, changeCartNumber } from "../../redux/slide/cartSlide";
import productService from "../../services/productService";
import { useNavigate } from "react-router-dom";
import { changeShowDrawer } from "../../redux/slide/orderSlide";
export const Header = () => {
  const nav = useNavigate();
  const { Search } = Input;
  // get category
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.categorySlide.listCategory);
  const loading = useSelector((state) => state.categorySlide.loading);
  const roleName = useSelector((state) => state.userSlide.role);
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
        dispatch(setRole(decoded?.role));
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
      //console.log(userName);
      setStyleHide({});
    }
  }, [userName, isLogin]);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  // handle Drawer
  const [open, setOpen] = useState(false);
  const isShowDrawer = useSelector((state) => state.orderSlide.showDrawer);
  const showDrawer = () => {
    dispatch(changeShowDrawer(true));
  };
  const onClose = () => {
    dispatch(changeShowDrawer(false));
  };
  const demo = () => {
    console.log("isLogin", isLogin);
  };
  // handle cart
  const userIdCurrent = useSelector((state) => state.userSlide.userId);
  const dataCartByUserId = useSelector(
    (state) => state.cartSlide.dataCartByUserId
  );
  const addedProduct = useSelector((state) => state.cartSlide.addedProduct);
  useEffect(() => {
    if (userIdCurrent) {
      dispatch(getCartInfoById(userIdCurrent));
    }
  }, [userIdCurrent, addedProduct]);
  useEffect(() => {
    dispatch(changeCartNumber(dataCartByUserId.length));
  }, [dataCartByUserId]);
  const cartNumber = useSelector((state) => state.cartSlide.cartNumber);

  // handle search
  const [searchTerm, setSearchTerm] = useState("");
  const [resultProduct, setResultProduct] = useState([]);
  const searchResultRef = useRef(null);
  const handleSearch = async (value) => {
    setSearchTerm(value);
    const data = (await productService.getAll("", searchTerm)).data.content;
    setResultProduct(data);
  };
  const handleClear = () => {
    setResultProduct([]);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target)
      ) {
        setResultProduct([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //console.log("resultProduct", resultProduct);
  return (
    <div className="wrapper-header">
      <Spin tip="Loading..." fullscreen spinning={loading} />
      <Drawer
        className="custom-drawer"
        title={
          <div className="drawer-title">
            <div className="header-title-text">Giỏ Hàng </div>

            <FaCartPlus />
          </div>
        }
        onClose={onClose}
        open={isShowDrawer}
        closeIcon={<IoIosCloseCircleOutline className="close-icon" />}
        width={500}
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
            {roleName == "admin" ? (
              <li className="item">
                <Link to="/admin">DashBoard</Link>
              </li>
            ) : (
              <></>
            )}
            <li className="item">
              <Link
                onClick={() => {
                  dispatch(changeIsLogin(false));
                  dispatch(changeUserName(""));
                  dispatch(setUserId(""));
                  dispatch(setRole(""));
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
        <div className="button-search-product">
          <Search
            placeholder="Tìm kiếm sản phẩm"
            allowClear
            onSearch={handleSearch}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setResultProduct([]);
            }}
            value={searchTerm}
          />
          {resultProduct == undefined ||
          resultProduct.length == 0 ||
          searchTerm == "" ? (
            <></>
          ) : (
            <div ref={searchResultRef} className="search-result-area">
              <div className="product-result-wrap">
                {resultProduct?.map((item, index) => (
                  <div key={index}>
                    <div
                      // key={index}
                      className="product-result-item"
                      onClick={() => {
                        nav(`/product/${item?.id}`);
                      }}
                    >
                      <div className="product-result-item-image">
                        <img
                          src={"/uploads/" + item?.productImages[0]?.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="product-result-item-text">
                        <h5>{item?.name}</h5>
                        <strong>
                          {item?.price.toLocaleString("vi-VN")} VND{" "}
                        </strong>
                      </div>
                    </div>
                    <div className="my-hr" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="icon like" onClick={demo}>
          <FcLike />
        </div>
        <div className="icon " onClick={showDrawer}>
          {cartNumber == 0 ? (
            <></>
          ) : (
            <span className="cart-status">{cartNumber}</span>
          )}
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

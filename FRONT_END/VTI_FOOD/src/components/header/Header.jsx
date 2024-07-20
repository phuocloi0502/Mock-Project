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
import { getAllProducts } from "../../redux/slide/productSlide";
import {
  changeIsLogin,
  changeUserName,
  setUserId,
} from "../../redux/slide/userSlide";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "../../utils/helpers";
import { jwtDecode } from "jwt-decode";
import { getCartInfoById } from "../../redux/slide/cartSlide";
import productService from "../../services/productService";
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
        // console.log(decoded); // show decoded
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
      //console.log(userName);
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
  //console.log(dataCartByUserId?.length, "cart length");

  // handle search
  const [searchTerm, setSearchTerm] = useState("");
  const [resultProduct, setResultProduct] = useState([]);
  const handleSearch = async (value) => {
    // Xử lý tìm kiếm ở đây
    console.log("Searching for:", value);
    setSearchTerm(value);
    const data = (await productService.getAll("", searchTerm)).data.content;
    setResultProduct(data);
    // dispatch(getAllProducts({ pageNumber: "", search: searchTerm }));
  };
  const handleClear = () => {
    console.log("da clues");
    setResultProduct([]);
  };
  console.log("resultProduct", resultProduct);
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
        open={open}
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
            <div className="search-result-area">
              <div className="product-result-wrap">
                {resultProduct?.map((item, index) => (
                  <div key={index} className="product-result-item">
                    <div className="product-result-item-image">
                      <img
                        src={"/uploads/" + item?.productImages[0]?.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="product-result-item-text">
                      <h4>{item?.name}</h4>
                      <strong>
                        {item?.price.toLocaleString("vi-VN")} VND{" "}
                      </strong>
                    </div>
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
          {dataCartByUserId.length == 0 || dataCartByUserId == undefined ? (
            <></>
          ) : (
            <span className="cart-status">{dataCartByUserId?.length}</span>
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

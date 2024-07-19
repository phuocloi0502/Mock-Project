import React, { useEffect } from "react";
import { Button, Card, Image, Typography, message, Spin, Modal } from "antd";
import "./card_product.scss";
import { IoStar } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalNotLogged } from "../modal_not_logged/ModalNotLogged";
import { addProductsToCart } from "../../redux/slide/cartSlide";
import { useState } from "react";
const { Text } = Typography;
export const CardProduct = (props) => {
  const dispatch = useDispatch();
  const productId = props.item?.id;
  const userIdCurrent = useSelector((state) => state.userSlide.userId);
  const loading = useSelector((state) => state.cartSlide.loading);

  let imageUrl = props.item.productImages[0]?.imageUrl;

  let des = props.item.abstract;
  if (String(des).length > 75) {
    des = des.substr(0, 70) + "...";
  }
  let name = props.item.name;

  if (String(name).length > 39) {
    name = name.substr(0, 39) + "...";
  }

  const for_loop_star = [];
  for (let i = 0; i < (props.item?.rating || 0); i++) {
    for_loop_star.push(<IoStar key={i} />);
  }

  const for_loop_star_outline = [];
  for (let i = 0; i < 5 - (props.item?.rating || 0); i++) {
    for_loop_star_outline.push(<IoIosStarOutline key={i} />);
  }

  let price = (props.item?.price || 0).toLocaleString("de-DE");

  const nav = useNavigate();
  const handleCard = (id) => {
    nav(`/product/${id}`);
  };

  const cartData = {
    userId: userIdCurrent,
    productId: productId,
    quantity: "1",
  };
  const [openModal, setOpenModal] = useState(false);
  const handleAddtoCart = (e) => {
    if (userIdCurrent == "") {
      setOpenModal(true);
    } else {
      try {
        dispatch(addProductsToCart(cartData));
      } catch (error) {
        console.log(error);
      }
    }
    e.stopPropagation();
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <div className="wrapper-card-product">
      {/* <Spin spinning={loading} fullscreen="true" /> */}
      <Modal
        footer={null}
        title="Thông báo"
        open={openModal}
        onCancel={handleCancel}
      >
        <Text type="success">
          {" "}
          <h5> Bạn chưa đăng nhập, vui lòng đăng nhập để mua hàng !</h5>{" "}
        </Text>
        <Link to={"/login"}>
          <Button type="primary">Đăng nhập</Button>
        </Link>
        <Text type="danger"> Nếu chưa có tài khoản </Text>
        <Link to={"/register"}>
          <Button danger type="primary">
            Đăng ký ngay
          </Button>
        </Link>
      </Modal>
      <Card onClick={() => handleCard(productId)} loading={props.loading}>
        <div className="card-product-image">
          {" "}
          <img src={"/uploads/" + imageUrl} alt="" />
          <div className="like-icon">
            <FcLike />
          </div>
        </div>
        <div className="card-product-rating">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoIosStarOutline />
          {/* {for_loop_star}
          {for_loop_star_outline} */}
        </div>
        <div className="card-product-name">{name}</div>
        <div className="card-product-des">{des}</div>
        <div className="card-product-footer">
          <div className="card-product-button-add">
            <Button
              onClick={(event) => handleAddtoCart(event)}
              danger
              type="primary"
            >
              Thêm Vào Giỏ
            </Button>
          </div>
          <div className="card-product-price">
            <span>{price} đ</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

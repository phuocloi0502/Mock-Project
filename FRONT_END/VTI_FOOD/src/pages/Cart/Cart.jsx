import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import img from "../../assets/test.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartInfoById,
  deleteProductFromCart,
  updateCart,
} from "../../redux/slide/cartSlide";
import { Button, Modal } from "antd";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { createOrder } from "../../redux/slide/orderSlide";
import { useNavigate } from "react-router-dom";
import { changeShowDrawer } from "../../redux/slide/orderSlide";
const Cart = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const userIdCurrent = useSelector((state) => state.userSlide.userId);
  const dataCartByUserId = useSelector(
    (state) => state.cartSlide.dataCartByUserId
  );
  const addedProduct = useSelector((state) => state.cartSlide.addedProduct);
  // data cart detail
  useEffect(() => {
    dispatch(getCartInfoById(userIdCurrent));
  }, [userIdCurrent, addedProduct]);
  //console.log(dataCartByUserId, "data cart by user id");
  // modal xóa sản phẩm trong giỏ
  const { confirm } = Modal;
  const showDeleteConfirm = (cartId, productId) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa mục này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        dispatch(deleteProductFromCart({ cartId, productId }));
        toast.success("Đã xóa sản phẩm !");
      },
      onCancel() {
        //console.log("Hủy xóa");
      },
    });
  };

  // tang so luong
  const handleIncreaseQuantity = (productId, quantity) => {
    const dataUpdateCart = {
      userId: userIdCurrent,
      productId: productId,
      quantity: quantity + 1,
    };
    dispatch(updateCart(dataUpdateCart));
    // toast.success("Đã xóa sản phẩm !");
  };
  // giam so luong
  const handleDecreaseQuantity = (productId, quantity) => {
    const dataUpdateCart = {
      userId: userIdCurrent,
      productId: productId,
      quantity: quantity - 1,
    };
    dispatch(updateCart(dataUpdateCart));
    //console.log(dataUpdateCart, "giam");
  };
  // Tính tổng tiền trong giỏ hàng
  const calculateTotal = () => {
    return dataCartByUserId.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // tao don hang
  const handleOrderNow = () => {
    nav("/checkout");
    dispatch(changeShowDrawer(false));
    //  console.log("da dat hang");
    // const dataCreateOrder = {
    //   userId: userIdCurrent,
    //   deliveryDate: "2024-07-15",
    //   deliveryAddress: "Ba Tri",
    //   orderStatus: "DA_NHAN",
    //   note: "Test",
    //   paymentMethodId: 1,
    //   paymentStatus: "False",
    //   paymentDate: "",
    // };
    // try {
    //    dispatch(createOrder(userIdCurrent));
    // } catch (error) {}
  };
  return (
    <div className="cart-container">
      <div className="cart">
        <p className="title-mathang">
          Bạn có{" "}
          <span className="mathang">{dataCartByUserId.length} mặt hàng</span>{" "}
          trong giỏ hàng.
        </p>
        <div className="cart-total">
          <h3 className="total-title">Tổng tiền: </h3>
          <span className="total-price">
            {calculateTotal().toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="cart-area">
          {dataCartByUserId?.map((item, index) => (
            <div key={index}>
              <div className="cart-item">
                <div className="delete-product-wrap">
                  <Button
                    onClick={() => {
                      showDeleteConfirm(item.cartId, item.productId);
                    }}
                    danger
                    type="primary"
                    icon={<MdDeleteForever />}
                    key={index}
                  />
                </div>
                <div className="info-product">
                  <div className="info-product-image">
                    {" "}
                    <img src={"/uploads/" + item.images[0]} />
                  </div>
                  <div className="info-product-text">
                    {" "}
                    <h4 className="name-product">{item.productName}</h4>
                    <p className="price-product">
                      {item?.price?.toLocaleString("vi-VN") + " VND"}
                    </p>
                  </div>
                </div>
                <div className="item-quantity">
                  <Button
                    icon={<HiMinusSm />}
                    onClick={() =>
                      handleDecreaseQuantity(item.productId, item.quantity)
                    }
                  />
                  <span>{item.quantity}</span>
                  <Button
                    icon={<MdAdd />}
                    onClick={() =>
                      handleIncreaseQuantity(item.productId, item.quantity)
                    }
                  />
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="cart-footer">
          {dataCartByUserId.length == 0 || dataCartByUserId == undefined ? (
            <>
              <h4>Chưa có sản phẩm nào trong giỏ ! </h4>
            </>
          ) : (
            <>
              <Button
                danger
                type="primary"
                className="order-button"
                onClick={() => {
                  handleOrderNow();
                }}
              >
                Đặt Hàng Ngay
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

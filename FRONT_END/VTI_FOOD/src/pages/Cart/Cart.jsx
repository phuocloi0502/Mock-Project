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
import { Button } from "antd";
import { MdAdd } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const initialCartItems = [
    { id: 1, name: "Gà Rán", price: 2.5, quantity: 1 },
    { id: 2, name: "Gà Rán", price: 2.5, quantity: 1 },
    { id: 3, name: "Gà Rán", price: 2.5, quantity: 2 },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const [cartItems, setCartItems] = useState(initialCartItems);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const onClose = () => {
    setOpen(false);
  };
  const userIdCurrent = useSelector((state) => state.userSlide.userId);
  const dataCartByUserId = useSelector(
    (state) => state.cartSlide.dataCartByUserId
  );
  const addedProduct = useSelector((state) => state.cartSlide.addedProduct);

  useEffect(() => {
    dispatch(getCartInfoById(userIdCurrent));
  }, [userIdCurrent, addedProduct]);
  console.log(dataCartByUserId, "data cart by user id");

  const handleDeleteProductFromCart = (cartId, productId) => {
    dispatch(deleteProductFromCart({ cartId, productId }));
    toast.success("Đã xóa sản phẩm !");
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
          <span className="total-price">1000</span>
        </div>
        <div className="cart-area">
          {dataCartByUserId?.map((item, index) => (
            <div key={index}>
              <div className="cart-item">
                <div className="delete-product-wrap">
                  <Button
                    onClick={() => {
                      handleDeleteProductFromCart(item.cartId, item.productId);
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
                    <img src={img} alt={item.name} />
                  </div>
                  <div className="info-product-text">
                    {" "}
                    <h4 className="name-product">{item.productName}</h4>
                    <p className="price-product">12000</p>
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
              <Button danger type="primary" className="order-button">
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

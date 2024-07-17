import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import img from "../../assets/test.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getCartInfoById } from "../../redux/slide/cartSlide";
const Cart = () => {
  const [open, setOpen] = useState(false);
  const dispath = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   dispath(getCartInfoById("3"));
  // }, []);

  const initialCartItems = [
    { id: 1, name: "Gà Rán", price: 2.5, quantity: 1 },
    { id: 2, name: "Gà Rán", price: 2.5, quantity: 1 },
    { id: 3, name: "Gà Rán", price: 2.5, quantity: 2 },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const increaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <p className="title-mathang">
          Bạn có <span className="mathang">{cartItems.length} mặt hàng</span>{" "}
          trong giỏ hàng.
        </p>
        <div className="cart-total">
          <h3 className="total-title">Total</h3>
          <span className="total-price">${calculateTotalPrice()}</span>
        </div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-info">
              <img src={img} alt={item.name} />
              <div className="info-product">
                <h4 className="name-product">{item.name}</h4>
                <p className="price-product">${item.price.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-footer">
          <button className="order-button">Đặt Hàng Ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

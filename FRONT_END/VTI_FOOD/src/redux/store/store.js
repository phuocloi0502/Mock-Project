import { configureStore } from "@reduxjs/toolkit";
import demoSlide from "../slide/demo";
import categorySlide from "../slide/categorySlide";
import productSlide from "../slide/productSlide";
import userSlide from "../slide/userSlide";
import cartSlide from "../slide/cartSlide";
import orderSlide from "../slide/orderSlide";

export default configureStore({
  reducer: {
    demoSlide: demoSlide, // file demo, không dùng
    categorySlide: categorySlide,
    productSlide: productSlide,
    userSlide: userSlide,
    cartSlide: cartSlide,
    orderSlide: orderSlide,
  },
});

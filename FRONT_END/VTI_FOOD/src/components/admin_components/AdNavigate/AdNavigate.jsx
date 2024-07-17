import React from "react";
import { Link } from "react-router-dom";
import "./ad_navigate.scss";

import { GiForkKnifeSpoon } from "react-icons/gi";

export const AdNavigate = (props) => {
  return (
    <>
      <Link to={"/admin"}>
        {" "}
        <div className="logo-area">
          <div className="logo-web">
            <GiForkKnifeSpoon />
          </div>
          <div className="title-web">VTI-FOOD</div>
        </div>
      </Link>
      <div className="nav-area">
        <ul>
          <Link to={"/admin"}>
            {" "}
            <li>Bảng điều khiển</li>
          </Link>
          <Link to={"/admin/products"}>
            <li>Sản phẩm</li>
          </Link>
          <Link to={"/admin/categories"}>
            <li>Loại sản phẩm</li>
          </Link>
          <Link to={"/admin/order"}>
            <li>Đặt hàng</li>
          </Link>
          <Link to={"/admin/customer"}>
            <li>Khách hàng</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

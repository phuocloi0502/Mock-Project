import React from "react";
import "./ad_header.scss";
import UserAvatar from "../../../assets/user_avatar.avif";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { changeUserName } from "../../../redux/slide/userSlide";
export const AdHeader = (props) => {
  const nav = useNavigate();
  const token = getToken();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(changeUserName(decoded?.username));
    }
  }, [token]);
  const userName = useSelector((state) => state.userSlide.userName);

  return (
    <>
      <div className="header-aera">
        <div className="sign-out-area">
          <span
            onClick={() => {
              //  dispatch(changeUserName(""));
              localStorage.removeItem("token");
              nav("/admin/login");
            }}
          >
            Sign out
          </span>
        </div>
        <div className="notification-area">
          <IoMdNotifications />
          <div className="notification-count">2</div>
        </div>
        <div className="admin-info-area">
          <div className="admin-info-avatar">
            <img src={UserAvatar} alt="" />
          </div>
          <div className="admin-info-name">
            <span>{userName}</span>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

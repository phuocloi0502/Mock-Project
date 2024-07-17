import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/helpers";

export const AdminLayout = ({ children, isPublic }) => {
  const token = getToken();
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded?.role === "admin";
    } catch (error) {
      console.error("Token decode failed", error);
      return <Navigate to="/admin/login" />;
    }
  }

  // Điều hướng nếu trang công cộng nhưng đã đăng nhập
  if (isPublic && token) {
    return <Navigate to="/admin" />;
  }

  // Điều hướng nếu trang không công cộng nhưng không có token
  if (!isPublic && !token) {
    return <Navigate to="/admin/login" />;
  }

  // Điều hướng nếu không phải là admin
  if (!isPublic && token && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

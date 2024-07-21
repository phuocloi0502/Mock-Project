import App from "../App";
import { ProductByCategory } from "../pages/ProductByCategory/ProductByCategory.jsx";
import { ProductDetail } from "../pages/ProductDetail/ProductDetail.jsx";
import { Home } from "../pages/Home/Home";
import { LoginAdmin } from "../pages/Admin_UI/LoginAdmin/LoginAdmin.jsx";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Products } from "../pages/Products/Products.jsx";
// import Cart from "../pages/Cart/Cart";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./AuthLayout.jsx";
import { MyAccount } from "../pages/MyAccount/MyAccount.jsx";
import { MyOrder } from "../pages/MyOrder/MyOrder.jsx";
import { WishList } from "../pages/WishList/WishList.jsx";
import { MyOrderDetail } from "../pages/MyOrderDetail/MyOrderDetail.jsx";
import { CheckOut } from "../pages/CheckOut/CheckOut.jsx";
import Admin from "../Admin.jsx";

//page admin
import { AdDashBoard } from "../pages/Admin_UI/AdDashBoard/AdDashBoard.jsx";
import { ViewAdOrder } from "../pages/Admin_UI/AdOrder/ViewAdOrder/ViewAdOrder.jsx";
import { ViewAdOrderDetail } from "../pages/Admin_UI/AdOrder/ViewAdOrderDetail/ViewAdOrderDetail.jsx";
import { ViewAdProduct } from "../pages/Admin_UI/AdProduct/ViewAdProduct/ViewAdProduct.jsx";
import { CreateAdProduct } from "../pages/Admin_UI/AdProduct/CreateAdProduct/CreateAdProduct.jsx";

import UpdateAdProduct from "../pages/Admin_UI/AdProduct/UpdateAdProduct/UpdateAdProduct.jsx";
import { ViewAdCategory } from "../pages/Admin_UI/AdCategory/ViewAdCategory/ViewAdCategory.jsx";
import { CreateAdCategory } from "../pages/Admin_UI/AdCategory/CreateAdCategory/CreateAdCategory.jsx";
import { UpdateAdCategory } from "../pages/Admin_UI/AdCategory/UpdateAdCategory/UpdateAdCategory.jsx";
import { ViewAdCustomer } from "../pages/Admin_UI/AdCustomer/ViewAdCustomer/ViewAdCustomer.jsx";
import { ViewAdCustomerDetail } from "../pages/Admin_UI/AdCustomer/ViewAdCustomerDetail/ViewAdCustomerDetail.jsx";
import { CreateAdCustomer } from "../pages/Admin_UI/AdCustomer/CreateAdCustomer/CreateAdCustomer.jsx";
import { AdminLayout } from "./AdminLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Products />,
      },
      {
        path: "/category/:id",
        element: <ProductByCategory />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/wish_list",
        element: (
          <AuthLayout isPublic={false}>
            <WishList />
          </AuthLayout>
        ),
      },
      {
        path: "/my_account",
        element: (
          <AuthLayout isPublic={false}>
            <MyAccount />
          </AuthLayout>
        ),
      },
      {
        path: "/my_order",
        element: (
          <AuthLayout isPublic={false}>
            <MyOrder />
          </AuthLayout>
        ),
      },
      {
        path: "/my_order/:orderId",
        element: (
          <AuthLayout isPublic={false}>
            <MyOrderDetail />
          </AuthLayout>
        ),
      },
      {
        path: "/checkout",
        element: (
          <AuthLayout isPublic={false}>
            <CheckOut />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout isPublic={true}>
            {" "}
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/admin/login",
    element: (
      <AdminLayout isPublic={true}>
        <LoginAdmin />
      </AdminLayout>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminLayout isPublic={false}>
        <Admin />
      </AdminLayout>
    ),
    children: [
      {
        path: "/admin",
        element: <AdDashBoard />,
      },
      {
        path: "/admin/order",
        element: <ViewAdOrder />,
      },
      {
        path: "/admin/order/:orderId",
        element: <ViewAdOrderDetail />,
      },
      {
        path: "/admin/products",
        element: <ViewAdProduct />,
      },
      {
        path: "/admin/products/create",
        element: <CreateAdProduct />,
      },
      {
        path: "/admin/products/:productId",
        element: <UpdateAdProduct />,
      },
      {
        path: "/admin/categories",
        element: <ViewAdCategory />,
      },
      {
        path: "/admin/categories/create",
        element: <CreateAdCategory />,
      },
      {
        path: "/admin/categories/update",
        element: <UpdateAdCategory />,
      },
      {
        path: "/admin/customer",
        element: <ViewAdCustomer />,
      },
      {
        path: "/admin/customer/1",
        element: <ViewAdCustomerDetail />,
      },
      {
        path: "/admin/customer/create",
        element: <CreateAdCustomer />,
      },
      {
        path: "/admin/customer/update",
        // element: <UpdateAdCustomer />,
      },
    ],
  },
]);

export default router;

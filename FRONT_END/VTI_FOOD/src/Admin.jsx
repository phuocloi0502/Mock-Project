import { Outlet } from "react-router-dom";
import { AdHeader } from "./components/admin_components/AdHeader/AdHeader";
import { AdNavigate } from "./components/admin_components/AdNavigate/AdNavigate";
import "./utils/admin.scss";
function Admin() {
  return (
    <div className="admin-container">
      <div className="navigate-wrap">
        <AdNavigate />
      </div>
      <div className="admin-content">
        <div className="header-wrap">
          {" "}
          <AdHeader />
        </div>
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;

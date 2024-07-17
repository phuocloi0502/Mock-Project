import "./footer.scss";
export const Footer = () => {
  return (
    <div className="wrapper-footer">
      <div className="text-area">
        <h3>Trang Chính</h3>
        <ul>
          <li>Trang Chủ</li>
          <li>Thực Đơn</li>
          <li>Tài Khoản Của Tôi</li>
        </ul>
      </div>
      <div className="text-area">
        <h3>Liên Lạc</h3>
        <ul>
          <li>+08075930055</li>
          <li>xyz@gmail.com</li>
        </ul>
      </div>
      <div className="text-area">
        <h3>Theo Dõi Chúng Tôi</h3>
        <ul>
          <li>Facebook</li>
          <li>Github</li>
        </ul>
      </div>
    </div>
  );
};

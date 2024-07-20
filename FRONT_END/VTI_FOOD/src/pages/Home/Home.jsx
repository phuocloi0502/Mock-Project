import "./home.scss";
import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { Col, Row, Divider, Pagination } from "antd";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CardProduct } from "../../components/card_product/CardProduct";
import { BannerImage } from "../../components/banner_image/BannerImage";
import { getAllProducts } from "../../redux/slide/productSlide";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({ pageNumber: 1 }));
  }, []);

  const listProduct = useSelector((state) => state.productSlide.listProduct);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  // card loading
  const loading = useSelector((state) => state.productSlide.loading);

  return (
    <>
      <div className="banner-wrap">
        <Row className="title-content">
          <Col className="text" span={24}>
            <h1 className="content-1">Về Chúng Tôi</h1>
          </Col>
          <Col className="text" span={24}>
            <h1>WHY CHOOSE US?</h1>
          </Col>
        </Row>
        <Row className="container-wrap">
          <Col span={15}>
            <BannerImage />
          </Col>
          <Col span={9}>
            <Row className="container-text">
              <Col className="content-1">
                <h1>Thức ăn nhanh ngon nhất thị trường Việt Nam</h1>
              </Col>
            </Row>
            <Row className="container-advantage">
              <Col span={8} className="advantage-col">
                <Row wrap={false} className="advantage">
                  <Col span={6} className="advantage-icon">
                    <FaShippingFast />
                  </Col>
                  <Col span={18} className="advantage-text">
                    Miễn phí giao hàng
                  </Col>
                </Row>
              </Col>
              <Col span={8} className="advantage-col">
                <Row wrap={false} className="advantage">
                  <Col span={6} className="advantage-icon">
                    <MdOutlineAttachMoney />
                  </Col>
                  <Col span={18} className="advantage-text">
                    Thanh toán dễ dàng
                  </Col>
                </Row>
              </Col>
              <Col span={8} className="advantage-col">
                <Row wrap={false} className="advantage">
                  <Col span={6} className="advantage-icon">
                    <RiCustomerService2Fill />
                  </Col>
                  <Col span={18} className="advantage-text">
                    Dịch Vụ 24/7
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="products">
        <div className="products container">
          <div className="products best-selling">
            <Divider orientation="center">
              <h2>TOP SẢN PHẨM BÁN CHẠY</h2>
            </Divider>
            <Row gutter={[16, 16]}>
              {listProduct.map((item, index) => (
                <Col key={index} span={6}>
                  <CardProduct item={item} loading={loading} />
                </Col>
              ))}
            </Row>
          </div>
          <div className="products today-speciality">
            <Divider orientation="center">
              <h2>TODAY'S SPECIALITY</h2>
            </Divider>
            <Row gutter={[16, 16]}>
              {listProduct.map((item, index) => (
                <Col key={index} span={6}>
                  <CardProduct item={item} loading={loading} />
                </Col>
              ))}
            </Row>
            {/* <div className="products pagenumber">
              <Pagination current={current} onChange={onChange} total={50} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

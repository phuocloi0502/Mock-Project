import { SlideImages } from "../../components/slide_images/SlideImages";
import { Col, Row, Card, Spin, Pagination, Flex } from "antd";
import "../ProductByCategory/product_by_category.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { CardProduct } from "../../components/card_product/CardProduct";
import { getAllProducts } from "../../redux/slide/productSlide";

export const Products = () => {
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts({ pageNumber: current }));
  }, [current]);

  const listProduct = useSelector((state) => state.productSlide.listProduct);

  const totalElements = useSelector(
    (state) => state.productSlide.totalElements
  );
  //console.log(totalElements, "tong item");

  const onChange = (page) => {
    setCurrent(page);
  };
  return (
    <>
      <div className="slideshow-area">
        <SlideImages />
      </div>

      <div className="product-content">
        <p>Thực Đơn</p>
        <div className="product-list">
          <Row gutter={[16, 16]}>
            {listProduct.map((item, index) => (
              <Col key={index} span={6}>
                <CardProduct item={item} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="product-pagenumber">
          <Pagination
            pageSize={8}
            current={current}
            onChange={onChange}
            total={totalElements}
          />
        </div>
      </div>
    </>
  );
};

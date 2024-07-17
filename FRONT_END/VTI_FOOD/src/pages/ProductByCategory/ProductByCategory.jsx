import { SlideImages } from "../../components/slide_images/SlideImages";
import { Col, Row, Card, Spin, Pagination, Flex, Divider } from "antd";
import "./product_by_category.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { CardProduct } from "../../components/card_product/CardProduct";
import { useParams } from "react-router-dom";
import { getByCategoryId } from "../../redux/slide/productSlide";
import { getById } from "../../redux/slide/categorySlide";

export const ProductByCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // set page
  const [currentPage, setCurrentPage] = useState(1);
  const onChange = (page) => {
    setCurrentPage(page);
  };
  // get data
  useEffect(() => {
    dispatch(getById(id));
    dispatch(getByCategoryId({ id: id, pageNumber: currentPage }));
  }, [id, currentPage]);

  const categoryName = useSelector((state) => state.categorySlide.categoryName);
  const listProductByCategory = useSelector(
    (state) => state.productSlide.listProductByCategoryId
  );

  // get tong so item
  const totalElements = useSelector(
    (state) => state.productSlide.totalElements
  );
  const loading = useSelector((state) => state.categorySlide.loading);
  return (
    <>
      <div className="slideshow-area">
        <SlideImages />
      </div>

      <div className="product-content">
        <p>
          Thực Đơn <span style={{ color: "gray" }}>/ </span>
          {categoryName}
        </p>
        <Divider orientation="center">
          <h2> {categoryName}</h2>
        </Divider>
        <div className="product-list">
          <Row gutter={[16, 16]}>
            {listProductByCategory.map((item, index) => (
              <Col key={index} span={6}>
                <CardProduct item={item} loading={loading} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="product-pagenumber">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={totalElements}
            pageSize={8}
          />
        </div>
      </div>
    </>
  );
};

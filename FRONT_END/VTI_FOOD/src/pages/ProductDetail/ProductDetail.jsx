import React, { useEffect, useRef, useState } from "react";
import "./product_detail.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getById } from "../../redux/slide/productSlide";
import { getByCategoryId } from "../../redux/slide/productSlide";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Row, Col, message, Spin, Modal, Button, Typography } from "antd";
import { CardProduct } from "../../components/card_product/CardProduct";
import { addProductsToCart } from "../../redux/slide/cartSlide";
const { Text } = Typography;

export const ProductDetail = ({ productRelate }) => {
  //get data =>> product by id
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(id));
  }, [id]);
  const productData = useSelector((state) => state.productSlide.productById);
  const userIdCurrent = useSelector((state) => state.userSlide.userId);

  useEffect(() => {
    if (productData.category_id !== undefined) {
      dispatch(
        getByCategoryId({ id: productData?.category_id, pageNumber: 1 })
      );
    }
  }, [productData.category_id]);

  const listProductByCategory = useSelector(
    (state) => state.productSlide.listProductByCategoryId
  );

  productRelate = Array.isArray(productRelate) ? productRelate : [];

  const [slideIndex, setSlideIndex] = useState(1);
  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(9);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // const addToWishlist = (item) => {
  //   setWishlist([...wishlist, item]);
  //   setIsInWishlist(true);
  // };

  const slideRef = useRef();

  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childrenElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childrenElementCount;
    setWidth(width);
  }, []);

  function pluslide(n) {
    setSlideIndex((pre) => pre + n);
    slideShow(slideIndex + n);
  }

  function dragStart(e) {
    setStart(e.clientX);
  }

  function dragOver(e) {
    e.preventDefault();
    let touch = e.clientX;
    setChange(start - touch);
  }

  function dragEnd(e) {
    if (change > 0) {
      slideRef.current.scrollLeft += width;
    } else {
      slideRef.current.scrollLeft -= width;
    }
    setChange(0);
  }

  useEffect(() => {
    if (!slideRef.current || !width) return;
    let numOfThumb = Math.round(slideRef.current.offsetWidth / width);
    slideRef.current.scrollLeft =
      slideIndex > numOfThumb ? (slideIndex - 1) * width : 0;
  }, [width, slideIndex]);

  function slideShow(n) {
    if (n > productData.productImages.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(productData.productImages.length);
    }
  }
  const cartData = {
    userId: userIdCurrent,
    productId: id,
    quantity: "1",
  };
  const loading = useSelector((state) => state.productSlide.loading);
  const [openModal, setOpenModal] = useState(false);
  const handleAddtoCart = () => {
    if (userIdCurrent == "") {
      setOpenModal(true);
    } else {
      try {
        dispatch(addProductsToCart(cartData));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <div className="product-detail-container">
      <Spin spinning={loading} fullscreen="true" />
      <Modal
        footer={null}
        title="Thông báo"
        open={openModal}
        onCancel={handleCancel}
      >
        <Text type="success">
          {" "}
          <h5> Bạn chưa đăng nhập, vui lòng đăng nhập để mua hàng !</h5>{" "}
        </Text>
        <Link to={"/login"}>
          <Button type="primary">Đăng nhập</Button>
        </Link>
        <Text type="danger"> Nếu chưa có tài khoản </Text>
        <Link to={"/register"}>
          <Button danger type="primary">
            Đăng ký ngay
          </Button>
        </Link>
      </Modal>
      <nav className="nav-link">
        <Link>Thực đơn</Link>
        <span className="separator">{" > "}</span>
        <Link to={`/category/${productData?.category_id}`}>
          {productData?.categoryName}
        </Link>
      </nav>
      <section className="product-details">
        <div className="product-page-img">
          {productData?.productImages?.map((image, index) => (
            <div
              key={index}
              className="mySlides"
              style={{ display: index + 1 === slideIndex ? "block" : "none" }}
            >
              <div className="numberText">
                {index + 1}/{productData?.productImages.length}
              </div>
              <img
                src={"/uploads/" + image.imageUrl}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
          <a href="#!" className="prev" onClick={() => pluslide(-1)}>
            &#10094;
          </a>
          <a href="#!" className="next" onClick={() => pluslide(1)}>
            &#10095;
          </a>
          <div
            className="slider-img"
            draggable={true}
            ref={slideRef}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
          >
            {productData?.productImages?.map((image, index) => (
              <div
                className={`slider-box ${index + 1 === slideIndex && "active"}`}
                onClick={() => setSlideIndex(index + 1)}
                key={index}
              >
                <img src={"/uploads/" + image.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="product-page-deatails">
          <div className="product-name">
            Tên món: <span>{productData?.name}</span>
          </div>
          <div className="product-price">
            Giá: <span> {productData?.price?.toLocaleString("de-DE")} đ</span>
          </div>
          <p className="small-desc">
            <strong>Mô tả: </strong> {productData.description}
          </p>
          <div className="cart-btn" onClick={handleAddtoCart}>
            <a href="#!" className="add-cart">
              Thêm vào giỏ hàng
            </a>
            <button
              className="add-to-wishlist"
              onClick={() => addToWishlist(product)}
            >
              {isInWishlist ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart color="red" />
              )}{" "}
              Thêm vào danh sách yêu thích
            </button>
            {/* <Wishlist wishlist={wishlist} /> */}
          </div>
        </div>
      </section>
      <div className="similar-products">
        <h2>Những sản phẩm tương tự</h2>
        <Row gutter={[16, 16]}>
          {listProductByCategory?.map((item, index) =>
            index < 4 ? (
              <Col key={index} span={6}>
                <CardProduct item={item} />
              </Col>
            ) : (
              <div key={index}></div>
            )
          )}
        </Row>
      </div>
    </div>
  );
};
